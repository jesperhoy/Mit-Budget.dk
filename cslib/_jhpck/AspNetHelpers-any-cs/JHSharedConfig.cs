using System;
using System.Collections.Generic;
using System.IO;

public static class JHSharedConfig {
  private static Dictionary<string, string> Dict;
  private static object LockObj = new object();
  private static System.IO.FileSystemWatcher FileMon;

  public static string Get(string section, string key) {
    lock (LockObj) {
      if (Dict == null) Load();

      string rv = null;
      if (Dict.TryGetValue((section + "*_*_*" + key).ToLower(), out rv)) return rv;
      throw new Exception("Value not found: [" + section + "] " + key);
    }
  }

  private static void Load() {
    if (FileMon == null) StartFileMon();

    Dict = new Dictionary<string, string>();
    var fs = System.IO.File.OpenRead(@"c:\web-sites\shared-config.ini");
    var rdr = new System.IO.StreamReader(fs, System.Text.Encoding.UTF8, true);
    string x = null;
    int i = 0;
    string CurSect = "";
    string CurKey = null;
    string DictKey = null;
    var ln = 0;
    do {
      ln += 1;
      x = rdr.ReadLine();
      if (x == null) {
        break;
      }
      x = x.Trim();
      if (x.Length == 0) {
        continue;
      }
      if (x.StartsWith(";")) {
        continue;
      }
      if (x.StartsWith("[")) {
        i = x.IndexOf("]");
        if (i < 0) {
          throw new Exception("Missing end section ] in line " + ln);
        }
        CurSect = x.Substring(1, i - 1).Trim().ToLower();
        continue;
      }
      i = x.IndexOf("=");
      if (i < 0) {
        throw new Exception("Missing = in line " + ln);
      }
      if (i == 0) {
        throw new Exception("Missing key before = in line " + ln);
      }
      CurKey = x.Substring(0, i).Trim().ToLower();
      DictKey = CurSect + "*_*_*" + CurKey;
      if (Dict.ContainsKey(DictKey)) {
        throw new Exception("Duplicate key in line " + ln);
      }
      x = x.Substring(i + 1).Trim();
      if (x.Length == 0) {
        throw new Exception("Missing value in line " + ln);
      }
      Dict.Add(DictKey, x);
    } while (true);
    rdr.Close();
    fs.Close();
  }

  private static void StartFileMon() {
    FileMon = new FileSystemWatcher(@"c:\web-sites", "shared-config.ini");
    FileMon.IncludeSubdirectories = false;
    FileMon.NotifyFilter = NotifyFilters.LastWrite;
    FileMon.Changed += (sender, e) => {
      lock (LockObj) {
        Dict = null;
      }
    };
    FileMon.EnableRaisingEvents = true;
  }

}
