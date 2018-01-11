export class Utilities {
    public test = 10;
   returnResult = async (promise) => {
        await promise.then((result) => result.getText());
    }
}
