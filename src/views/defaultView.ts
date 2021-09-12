
export class DefaultView {
  static success(message: string) {
    return { success: message };
  }

  static error(error: string) {
    return { error: error };
  }

  static manyErrors(messages: string[]) {
    return messages.map(message => message)
  }
}