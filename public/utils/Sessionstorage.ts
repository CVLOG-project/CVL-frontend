class Sessionstorage {
  static setItem(key: string, item: string) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, item);
    }
  }

  static getItem(key: string) {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  static removeItem(key: string) {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  }
}

export default Sessionstorage;
