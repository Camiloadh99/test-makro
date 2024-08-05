class PaginatedResponse<T = any> {
  items: T[];
  total: number;
  next?: string;
  prev?: string;

  constructor(items: T[], total: number, next?: string, prev?: string) {
    this.items = items;
    this.total = total;
    this.next = next;
    this.prev = prev;
  }
}

export { PaginatedResponse };
