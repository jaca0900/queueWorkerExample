export class ThreadUtils {
    public static sleep (ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}