var Q1 = require("./main");

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });

test('calculateMassOf', () => {
    expect(Q1.calculateMassOf(12)).toBe(2);
});

test('calculateTotalMassOf', () => {
    const mockFn= jest.mock();
    mockFn.spyOn(Q1, 'calculateMassOf').mockReturnValue(2);
    expect(Q1.calculateMassOf(12)).toBe(2);


    mockFn.spyOn(Q1, 'calculateMassOf').mockReturnValue(4);
    expect(Q1.calculateMassOf(14)).toBe(4);


    // mockFn.spyOn(Q1, 'calculateMassOf').mockReturnValueOnce(644).mockReturnValueOnce(212).mockReturnValueOnce(68).mockReturnValueOnce(10).mockReturnValueOnce(0);
    // expect(Q1.calculateMassOf(1969)).toBe(934);
    // const spy = mockFn.spyOn(Q1, 'calculateMassOf');
    // expect(spy).toHaveBeenCalled(5);

});