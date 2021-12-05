/**
 * Desired ordering by records' values at the given property path.
 */
enum OrderByDirection {
  /**
   * The records will be traversed in the order in which the key(s) values are in monotonically increasing order.
   */
  ASCENDING = 'OrderByDirection.ASCENDING',

  /**
   * The records will be traversed in the order in which the key(s) values are in monotonically decreasing order.
   */
  DESCENDING = 'OrderByDirection.DESCENDING',
}

export default OrderByDirection
