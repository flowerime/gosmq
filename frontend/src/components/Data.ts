// Generated by https://quicktype.io

import { DataOld } from "./DataOld";

export interface Data {
  Info: Info;
  Commit: Char;
  Char: Char;
  Han: Han;
  Pair: Pair;
  Keys: Keys;
  Dist: Dist;
}

export interface Char {
  Count: number;
  Word: number;
  WordFirst: number;
  Collision: number;
}

export interface Dist {
  CodeLen: number[];
  WordLen: number[];
  Collision: number[];
  Finger: number[];
  Key: { [key: string]: number };
}

export interface Han {
  NotHan: string;
  NotHans: number;
  NotHanCount: number;
  Lack: string;
  Lacks: number;
  LackCount: number;
}

export interface Info {
  TextName: string;
  TextLen: number;
  DictName: string;
  DictLen: number;
  Single: boolean;
}

export interface Keys {
  Count: number;
  CodeLen: number;
  LeftHand: number;
  RightHand: number;
}

export interface Pair {
  Count: number;
  Equivalent: number;
  SameFinger: number;
  DoubleHit: number;
  TribleHit: number;
  SingleSpan: number;
  MultiSpan: number;
  Staggered: number;
  Disturb: number;
  LeftToLeft: number;
  LeftToRight: number;
  RightToLeft: number;
  RightToRight: number;
  DiffFinger: number;
  SameHand: number;
  DiffHand: number;
}

export class DataUtils {
  data: Data;
  constructor(data: Data) {
    this.data = data;
  }
  _commitRate(count: number): number {
    return count / this.data.Commit.Count;
  }
  _charRate(count: number): number {
    return count / this.data.Char.Count;
  }
  _keyRate(count: number): number {
    return count / this.data.Keys.Count;
  }
  _pairRate(count: number): number {
    return count / this.data.Pair.Count;
  }

  commitRate(count: number, fixed = 2): string {
    return (this._commitRate(count) * 100).toFixed(fixed) + "%";
  }

  charRate(count: number, fixed = 2): string {
    return (this._charRate(count) * 100).toFixed(fixed) + "%";
  }

  keyRate(count: number, fixed = 2): string {
    return (this._keyRate(count) * 100).toFixed(fixed) + "%";
  }

  pairRate(count: number, fixed = 2): string {
    return (this._pairRate(count) * 100).toFixed(fixed) + "%";
  }
}

export function New2Old(_new: Data): DataOld {
  const util = new DataUtils(_new);
  const _old: DataOld = {
    TextName: _new.Info.TextName,
    TextLen: _new.Info.TextLen,
    DictName: _new.Info.DictName,
    DictLen: _new.Info.DictLen,
    Single: _new.Info.Single,
    Basic: {
      NotHan: _new.Han.NotHan,
      NotHans: _new.Han.NotHans,
      NotHanCount: _new.Han.NotHanCount,
      Lack: _new.Han.Lack,
      Lacks: _new.Han.Lacks,
      LackCount: _new.Han.LackCount,
      Commits: _new.Commit.Count,
    },
    Words: {
      Commits: {
        Count: _new.Commit.Word,
        Rate: util._commitRate(_new.Commit.Word),
      },
      Chars: {
        Count: _new.Char.Word,
        Rate: util._charRate(_new.Char.Word),
      },
      Dist: _new.Dist.WordLen,
    },
    Collision: {
      Commits: {
        Count: _new.Commit.Collision,
        Rate: util._commitRate(_new.Commit.Collision),
      },
      Chars: {
        Count: _new.Char.Collision,
        Rate: util._charRate(_new.Char.Collision),
      },
      Dist: _new.Dist.Collision,
    },
    CodeLen: {
      Total: _new.Keys.Count,
      PerChar: _new.Keys.CodeLen,
      Dist: _new.Dist.CodeLen,
    },
    Keys: {},
    Combs: {
      Count: _new.Pair.Count,
      Equivalent: util._pairRate(_new.Pair.Equivalent),
      DoubleHit: {
        Count: _new.Pair.DoubleHit,
        Rate: util._pairRate(_new.Pair.DoubleHit),
      },
      TribleHit: {
        Count: _new.Pair.TribleHit,
        Rate: util._pairRate(_new.Pair.TribleHit),
      },
      SingleSpan: {
        Count: _new.Pair.SingleSpan,
        Rate: util._pairRate(_new.Pair.SingleSpan),
      },
      MultiSpan: {
        Count: _new.Pair.MultiSpan,
        Rate: util._pairRate(_new.Pair.MultiSpan),
      },
      LongFingersDisturb: {
        Count: _new.Pair.Staggered,
        Rate: util._pairRate(_new.Pair.Staggered),
      },
      LittleFingersDisturb: {
        Count: _new.Pair.Disturb,
        Rate: util._pairRate(_new.Pair.Disturb),
      },
    },
    Fingers: {
      Dist: [],
      Same: {
        Count: _new.Pair.SameFinger,
        Rate: util._pairRate(_new.Pair.SameFinger),
      },
      Diff: {
        Count: _new.Pair.DiffFinger,
        Rate: util._pairRate(_new.Pair.DiffFinger),
      },
    },
    Hands: {
      Left: {
        Count: _new.Keys.LeftHand,
        Rate: util._keyRate(_new.Keys.LeftHand),
      },
      Right: {
        Count: _new.Keys.RightHand,
        Rate: util._keyRate(_new.Keys.RightHand),
      },
      Same: {
        Count: _new.Pair.SameHand,
        Rate: util._pairRate(_new.Pair.SameHand),
      },
      Diff: {
        Count: _new.Pair.DiffHand,
        Rate: util._pairRate(_new.Pair.DiffHand),
      },
      LeftToLeft: {
        Count: _new.Pair.LeftToLeft,
        Rate: util._pairRate(_new.Pair.LeftToLeft),
      },
      LeftToRight: {
        Count: _new.Pair.LeftToRight,
        Rate: util._pairRate(_new.Pair.LeftToRight),
      },
      RightToLeft: {
        Count: _new.Pair.RightToLeft,
        Rate: util._pairRate(_new.Pair.RightToLeft),
      },
      RightToRight: {
        Count: _new.Pair.RightToRight,
        Rate: util._pairRate(_new.Pair.RightToRight),
      },
    },
  };

  for (const key in _new.Dist.Key) {
    _old.Keys[key] = {
      Count: _new.Dist.Key[key],
      Rate: util._keyRate(_new.Dist.Key[key]),
    };
  }

  for (const key in _new.Dist.Finger) {
    _old.Fingers.Dist.push({
      Count: _new.Dist.Finger[key],
      Rate: util._keyRate(_new.Dist.Finger[key]),
    });
  }
  return _old;
}
