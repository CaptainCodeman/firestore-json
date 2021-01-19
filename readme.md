# Firestore-JSON

Convert Firestore REST response into simple JSON

![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![types included](https://badgen.net/npm/types/tslib)
![normal size](https://img.shields.io/bundlephobia/min/firestore-json?style=flat-square)
![gzipped size](https://img.shields.io/bundlephobia/minzip/firestore-json?style=flat-square)

Adapted from [firestore-parser](https://www.npmjs.com/package/firestore-parser) to reduce size, improve performance, add options to decode timestamps to dates and base64 strings to bytes, and fix some errors.

## Installation

Install using your package manager of choice:

  pnpm i firestore-json

## Example

```ts
import { toJSON } from 'firestore-json'

const url = `https://firestore.googleapis.com/v1/projects/my-project/databases/(default)/documents/mycollection/my-doc`

const resp = await fetch(url)
const json = await resp.json()
const data = toJSON(json.fields)
```

## Options

By default, `timestampValue` and `bytesValue` fields are left as-is (ISO and Base64 strings respectively) but these can be converted to Javascript `Date` and `Uint8Array` types automatically by passing an options object to the `toJSON` method with `timestamps` and / or `bytes` set to true as required:

```ts
const data = toJSON(json.fields, { timestamps: true, bytes: true })
```

## Data Structure

The Firestore JSON returned in the REST API, uses value type as keys. This can be difficult to work with since you have to know the data type prior getting the value. The firestore-parser removes this barrier for you.

### JSON Response from Firestore

```json
{
  "player": {
    "mapValue": {
      "fields": {
        "name": {
          "stringValue": "steve"
        },
        "health": {
          "integerValue": "100"
        },
        "alive": {
          "booleanValue": true
        }
      }
    }
  },
  "level": {
    "integerValue": "7"
  }
}
```

### JSON from firestore-json toJSON

```json
{
  "player": {
   "name": "steve",
   "health": 100,
   "alive": true
  },
  "level": 7
}
```