type Options = { bytes: boolean, timestamps: boolean }
type Converter = (val: any, opts: Partial<Options>) => any

const ArrayConverter = (val: any, opts: Partial<Options>) => (val && val.values || []).map((v: any) => toJSON(v, opts))
const BytesConverter = (val: any, opts: Partial<Options>) => opts.bytes ? Uint8Array.from(atob(val), c => c.charCodeAt(0)) : val
const GeoPointConverter = (val: any) => ({ latitude: 0, longitude: 0, ...val })
const IdentityConverter = (val: any) => val
const MapConverter = (val: any, opts: Partial<Options>) => toJSON(val && val.fields || {}, opts)
const NumberConverter = (val: any) => Number(val)
const TimestampConverter = (val: any, opts: Partial<Options>) => opts.timestamps ? new Date(val) : val

const TypeConverters: { [key: string]: Converter } = {
  arrayValue: ArrayConverter,
  booleanValue: IdentityConverter,
  bytesValue: BytesConverter,
  doubleValue: NumberConverter,
  geoPointValue: GeoPointConverter,
  integerValue: NumberConverter,
  mapValue: MapConverter,
  nullValue: IdentityConverter,
  referenceValue: IdentityConverter,
  stringValue: IdentityConverter,
  timestampValue: TimestampConverter,
}

export function toJSON(value: any, opts: Partial<Options> = { }) {
  if (typeof value === 'object') {
    for (const key in value) {
      const converter = TypeConverters[key]
      if (converter) {
        return converter(value[key], opts)
      } else {
        value[key] = toJSON(value[key], opts)
      }
    }
  }

  return value
}
