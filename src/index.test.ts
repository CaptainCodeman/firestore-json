import { toJSON } from './index'

const testData = {
  "name": "some/large/long/value",
  "fields": {
    "double": {
      "doubleValue": "456"
    },
    "number": {
      "integerValue": "123"
    },
    "array": {
      "arrayValue": {
        "values": [{
            "stringValue": "cat"
          },
          {
            "stringValue": "dog"
          }
        ]
      }
    },
    "array2": {
      "arrayValue": {}
    },
    "timestamp": {
      "timestampValue": "2018-03-11T08:00:00Z"
    },
    "obj": {
      "mapValue": {
        "fields": {
          "string": {
            "stringValue": "def"
          }
        }
      }
    },
    "bool": {
      "booleanValue": true
    },
    "bytes": {
      "bytesValue": "bWFkZSB0aGUgS2Vzc2VsIFJ1biBpbiBsZXNzIHRoYW4gdHdlbHZlIHBhcnNlY3M="
    },
    "string": {
      "stringValue": "abc"
    },
    "geo": {
      "geoPointValue": {
        "latitude": 10,
        "longitude": 30
      }
    },
    "ref": {
      "referenceValue": "some/large/long/value"
    },
    "isNull": {
      "nullValue": null
    }
  },
  "createTime": "2018-03-11T14:10:11.083793Z",
  "updateTime": "2018-03-11T14:10:11.083793Z"
};

test('Simple JS object match', () => {
  expect(toJSON({ data: "" })).toEqual({ data: "" });
});

test('Complex JS object match', () => {
  expect(toJSON(testData)).toEqual({
    "createTime": "2018-03-11T14:10:11.083793Z",
    "fields": {
      "array": [
        "cat",
        "dog"
      ],
      "array2": [],
      "bool": true,
      "geo": {
        "latitude": 10,
        "longitude": 30
      },
      "isNull": null,
      "double": 456,
      "number": 123,
      "obj": {
        "string": "def"
      },
      "ref": "some/large/long/value",
      "bytes": "bWFkZSB0aGUgS2Vzc2VsIFJ1biBpbiBsZXNzIHRoYW4gdHdlbHZlIHBhcnNlY3M=",
      "string": "abc",
      "timestamp": "2018-03-11T08:00:00Z"
    },
    "name": "some/large/long/value",
    "updateTime": "2018-03-11T14:10:11.083793Z"
  });
});

test('Bytes match', () => {
  expect(toJSON({
    encoded: {
      bytesValue: "bHVrZWlhbXlvdXJmYXRoZXI="
    }
  })).toEqual({
    encoded: "bHVrZWlhbXlvdXJmYXRoZXI="
  });
});

test('Strings match', () => {
  expect(toJSON({
    createTime: "2018-03-11T14:10:11.083793Z"
  })).toEqual({
    createTime: "2018-03-11T14:10:11.083793Z"
  });
});

test('Null match', () => {
  expect(toJSON({
    "isNull": {
      "nullValue": null
    }
  })).toEqual({ "isNull": null });
});

test('Reference match', () => {
  expect(toJSON({
    "ref": {
      "referenceValue": "some/longe/string/that/has/values"
    }
  })).toEqual({
    "ref": "some/longe/string/that/has/values"
  });
});

test('Geo match', () => {
  expect(toJSON({
    "geo": {
      "geoPointValue": {
        "latitude": 10,
        "longitude": 30
      }
    }
  })).toEqual({
    "geo": {
      "latitude": 10,
      "longitude": 30
    }
  });
});

test('Geo match zeros', () => {
  expect(toJSON({
    "geo": {
      "geoPointValue": {}
    }
  })).toEqual({
    "geo": {
      "latitude": 0,
      "longitude": 0
    }
  });
});

test('boolean match', () => {
  expect(toJSON({
    "bool": {
      "booleanValue": true
    }
  })).toEqual({ "bool": true });
});

test('double match', () => {
  expect(toJSON({
    "double": {
      "doubleValue": "456"
    }
  })).toEqual({ "double": 456 });
});

test('integer match', () => {
  expect(toJSON({
    "number": {
      "integerValue": "123"
    }
  })).toEqual({ "number": 123 });
});

test('Object match', () => {
  expect(toJSON({
    "obj": {
      "mapValue": {
        "fields": {
          "string": {
            "stringValue": "def"
          }
        }
      }
    }
  })).toEqual({ "obj": { "string": "def" } });
});

test('Object match with no values', () => {
  expect(toJSON({
    "obj": {
      "mapValue": {}
    }
  })).toEqual({ "obj": {} });
});

test('Object match with undefined value', () => {
  expect(toJSON({
    "obj": {
      "mapValue": undefined
    }
  })).toEqual({ "obj": {} });
});

test('Array match', () => {
  expect(toJSON({
    "array": {
      "arrayValue": {
        "values": [{
            "stringValue": "cat"
          },
          {
            "stringValue": "dog"
          }
        ]
      }
    }
  })).toEqual({ "array": ["cat", "dog"] });
});

test('Array match with no values', () => {
  expect(toJSON({
    "array": {
      "arrayValue": {}
    }
  })).toEqual({ "array": [] });
});

test('Array match with undefined value', () => {
  expect(toJSON({
    "array": {
      "arrayValue": undefined
    }
  })).toEqual({ "array": [] });
});

test('Timestamp to Date', () => {
  expect(toJSON({
    "timestamp": {
      "timestampValue": "2018-03-11T08:00:00Z"
    }
  }, { timestamps: true })).toEqual({
    "timestamp": new Date(Date.UTC(2018, 2, 11, 8, 0, 0))
  });
});

test('Bytes to Array', () => {
  expect(toJSON({
    "bytes": {
      "bytesValue": "bWFkZSB0aGUgS2Vzc2VsIFJ1biBpbiBsZXNzIHRoYW4gdHdlbHZlIHBhcnNlY3M="
    }
  }, { bytes: true })).toEqual({
    "bytes": new Uint8Array([
      109, 97, 100, 101, 32, 116, 104, 101, 32, 75, 101, 115, 115, 101, 108, 32,
      82, 117, 110, 32, 105, 110, 32, 108, 101, 115, 115, 32, 116, 104, 97, 110,
      32, 116, 119, 101, 108, 118, 101, 32, 112, 97, 114, 115, 101, 99, 115,
    ])
  });
});
