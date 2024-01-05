//** Leaky Buckets - v. 1.0 **
//NOTE: Contains both LeakyBucket and LeakyBuckets (singular and plural)

using System;
using System.Collections.Generic;
using System.Linq;

public class LeakyBucket {

  private int Capacity;
  private TimeSpan LeakInterval;

  private int Content = 0;
  private DateTime LastLeak = DateTime.UtcNow;

  public LeakyBucket(int bucketCapacity, TimeSpan leakInterval) {
    this.Capacity = bucketCapacity;
    this.LeakInterval = leakInterval;
  }

  public bool AddDrop() {
    Leak();
    if (Content >= Capacity) {
      return false;
    }
    Content += 1;
    return true;
  }

  public void Empty() {
    Content = 0;
  }

  public bool IsEmpty() {
    Leak();
    return Content == 0;
  }

  public bool IsFull() {
    Leak();
    return Content >= Capacity;
  }

  private void Leak() {
    do {
      if (Content == 0) {
        LastLeak = DateTime.UtcNow;
        return;
      }
      if (DateTime.UtcNow.Subtract(LastLeak) < LeakInterval) {
        return;
      }
      Content -= 1;
      LastLeak = LastLeak.Add(LeakInterval);
    } while (true);
  }

}

//------------------ bucket_S_ ----------------------------

public class LeakyBuckets {
  private readonly Dictionary<string, Bucket> Dict = new Dictionary<string, Bucket>();
  private BucketConfig BCfg;

  private struct BucketConfig {
    public int Capacity;
    public TimeSpan LeakInterval;
  }

  public LeakyBuckets(int bucketCapacity, TimeSpan leakInterval) {
    BCfg.Capacity = bucketCapacity;
    BCfg.LeakInterval = leakInterval;
  }

  public bool AddDrop(string bucketID) {
    lock (Dict) {
      Purge();
      Bucket b = null;
      if (!Dict.TryGetValue(bucketID, out b)) {
        b = new Bucket();
        Dict.Add(bucketID, b);
      }
      return b.AddOne(BCfg);
    }
  }

  public void Empty(string bucketID) {
    lock (Dict) {
      Purge();
      Dict.Remove(bucketID);
    }
  }

  public bool IsFull(string bucketID) {
    lock (Dict) {
      Purge();
      Bucket b = null;
      if (!Dict.TryGetValue(bucketID, out b)) {
        return false;
      }
      return b.IsFull(BCfg);
    }
  }

  private DateTime LastPurge = DateTime.UtcNow;
  private void Purge() {
    if (LastPurge > DateTime.UtcNow.AddMinutes(-5)) {
      return;
    }
    Dict.Where((kv) => kv.Value.IsEmpty(BCfg)).Select((kv) => kv.Key).ToList().ForEach(k=> Dict.Remove(k));
    LastPurge = DateTime.UtcNow;
  }

  private class Bucket {
    private int Content = 0;
    private DateTime LastLeak = DateTime.UtcNow;

    public bool AddOne(BucketConfig cfg) {
      Leak(cfg);
      if (Content >= cfg.Capacity) {
        return false;
      }
      Content += 1;
      return true;
    }

    public bool IsEmpty(BucketConfig cfg) {
      Leak(cfg);
      return Content == 0;
    }

    public bool IsFull(BucketConfig cfg) {
      Leak(cfg);
      return Content >= cfg.Capacity;
    }

    private void Leak(BucketConfig cfg) {
      do {
        if (Content == 0) {
          LastLeak = DateTime.UtcNow;
          return;
        }
        if (DateTime.UtcNow.Subtract(LastLeak) < cfg.LeakInterval) {
          return;
        }
        Content -= 1;
        LastLeak = LastLeak.Add(cfg.LeakInterval);
      } while (true);
    }

  }

}
