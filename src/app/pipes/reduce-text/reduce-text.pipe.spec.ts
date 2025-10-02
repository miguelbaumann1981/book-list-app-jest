import { ReduceTextPipe } from "./reduce-text.pipe";


describe ('ReduceTextPipe', () => {
    let pipe: ReduceTextPipe;

    beforeEach(() => {
        pipe = new ReduceTextPipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('transform should return the reduced text', () => {
        const text: string = 'Hello, this is a test to check pipe';
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5);
        expect(newText).toBe('Hello');
    });
});