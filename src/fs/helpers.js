/**
 * pad - Pad string with leading 0's
 *
 * @example pad('123', 5)  => '00123'
 *
 * @param  {type} string The string to pad
 * @param  {type} length Length of string to be returned
 * @return {type}        String containing leading 0's
 */
export function pad(string, length) {
  return string.length >= length ? string : new Array(length - string.length + 1).join('0') + string
}
