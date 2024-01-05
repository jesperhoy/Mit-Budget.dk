using System;

//** SendEmail - v. 1.0 **

public static class JHEmail {

  public static void SendEmail(System.Net.Mail.MailMessage msg) {
    var OldSecProt = System.Net.ServicePointManager.SecurityProtocol;
    System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12 | System.Net.SecurityProtocolType.Tls13;
    var sc = new System.Net.Mail.SmtpClient("smtp.office365.com", 587);
    sc.EnableSsl = true;
    sc.Credentials = new System.Net.NetworkCredential("system@jhsoftware.dk", JHSharedConfig.Get("emailpw","system"));
    if (msg.AlternateViews.Count < 2 && !msg.IsBodyHtml) {
      msg.Body = FixOutlookPlainEmailBody(msg.Body);
    }
    sc.Send(msg);
    System.Net.ServicePointManager.SecurityProtocol = OldSecProt;
  }

  public static void SendEmail(string fromEmail, string fromName, string toEmail, string toName, string subject, string body) {
    SendEmail(MakeEMail(fromEmail, fromName, toEmail, toName, subject, body));
  }

  public static void SendEmail(string fromEmail, string toEmail, string subject, string body) {
    var msg = new System.Net.Mail.MailMessage();
    msg.From = new System.Net.Mail.MailAddress(fromEmail);
    msg.To.Add(new System.Net.Mail.MailAddress(toEmail));
    msg.Subject = subject;
    msg.Body = body;
    SendEmail(msg);
  }

  public static System.Net.Mail.MailMessage MakeEMail(string fromEmail, string fromName, string toEmail, string toName, string subject, string body) {
    var msg = new System.Net.Mail.MailMessage();
    msg.From = (fromName == null) ? new System.Net.Mail.MailAddress(fromEmail) : new System.Net.Mail.MailAddress(fromEmail, fromName);
    msg.To.Add((toName == null) ? new System.Net.Mail.MailAddress(toEmail) : new System.Net.Mail.MailAddress(toEmail, toName));
    msg.Subject = subject;
    msg.Body = body;
    return msg;
  }

  public static void SendInboundEmail(System.Net.Mail.MailMessage msg) {
    //Send til IPv4 adresse (og dermed fra IPv4 adresse) - fordi IPv6 kan ikke s ttes p  tilladte i Exchange
    System.Net.IPAddress TheIP = null;
    foreach (var ip in System.Net.Dns.GetHostAddresses("jhsoftware-dk.mail.protection.outlook.com")) {
      if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork) {
        TheIP = ip;
        break;
      }
    }
    var mc = new System.Net.Mail.SmtpClient(TheIP.ToString());
    mc.Send(msg);
  }


  public static bool ValidEmail(string fStr) {
    if (fStr.IndexOfAny(" <>".ToCharArray()) >= 0) {
      return false;
    }
    int i = fStr.IndexOf('@');
    if (i < 1) {
      return false;
    }
    return ValidDomain(fStr.Substring(i + 1));
  }

  private static bool ValidDomain(string dom) {
    dom = dom.ToLower();
    if (dom.Length < 4) {
      return false;
    }
    if (dom.IndexOf(".") < 1) {
      return false;
    }
    if (dom.LastIndexOf('.') > dom.Length - 3) {
      return false;
    }
    if (dom.IndexOf("..") >= 0) {
      return false;
    }
    for (int i = 0; i < dom.Length; i++) {
      if ("1234567890abcdefghijklmnopqrstuvwxyz-.".IndexOf(dom[i]) < 0 && Convert.ToInt32(dom[i]) < 128) {
        return false;
      }
    }
    return true;
  }


  public static string FixOutlookPlainEmailBody(string x) {
    //see https://stackoverflow.com/questions/136052/how-do-i-format-a-string-in-an-email-so-outlook-will-print-the-line-breaks
    x = x.Replace("\r\n", "\n");
    int i = 0;
    int j = 0;
    string ln = null;
    var sb = new System.Text.StringBuilder();
    do {
      i = x.IndexOf("\n");
      if (i < 0) {
        sb.Append(x);
        return sb.ToString();
      }
      ln = x.Substring(0, i);
      j = x.IndexOf("\n" + "\n");
      x = x.Substring(i + 1);
      //i=j = two linefeeds - no need to change
      if (i == j || ln.Length == 0 || ln.EndsWith("   ") || ln.EndsWith(".") || ln.EndsWith("?") || ln.EndsWith("!") || ln.EndsWith(":")) {
        sb.AppendLine(ln);
      } else {
        sb.AppendLine(ln.TrimEnd() + "   ");
      }
    } while (true);
  }

}
