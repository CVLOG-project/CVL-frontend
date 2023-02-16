class Cookie {
  static setItem(key: string, item: string, exp: number) {
    if (typeof document !== 'undefined') {
      const date = new Date();
      date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
      document.cookie =
        key + '=' + item + ';expires=' + date.toUTCString() + ';path=/';
    }
  }

  static getItem(key: string) {
    if (typeof document !== 'undefined') {
      const value = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
      return value ? value[2] : null;
    }
    return null;
  }

  static removeItem(key: string) {
    if (typeof document !== 'undefined') {
      document.cookie = key + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    }
  }
}

export default Cookie;
