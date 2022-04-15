/**
 * Path to a record property used in index, filtering, sorting or record processing. Each element is a property name.
 * the first element is a name of property in the record, the second element is a name of property in the value of the
 * property referred by the first element, etc. An empty property path refers to the record itself.
 *
 * @template R The type of the record to which the property path applies.
 */
type PropertyPath<R> = readonly [] | readonly [keyof R] | readonly [keyof R, ...string[]]

export default PropertyPath
