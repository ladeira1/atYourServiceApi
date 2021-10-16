export class DefaultView {
  static success(message: string) {
    return { success: message };
  }

  static error(error: string) {
    return { error };
  }

  static manyErrors(messages: string[] | string) {
    if (Array.isArray(messages)) {
      return {
        error: messages.map(message => message),
      };
    }

    return { error: messages };
  }
}
