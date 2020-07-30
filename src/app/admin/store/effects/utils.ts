export class Utils {
  protected extractErrorMessage(errors){
    return errors.graphQLErrors[0]['message']
  }
}
