const { deterministicPartitionKey, dpkRefactor } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  
  it("Returns string when you give a number variable", () => {
    let event = { partitionKey: 12345 };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("12345");
    expect(trivialKey.length).toBeLessThan(256);
  });

  it("Returns string when you give a object variable", () => {
    let event = { partitionKey: {birth: 12345} };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("{\"birth\":12345}");
    expect(trivialKey.length).toBeLessThan(256);
  });

  it("Returns same string when you give a partitionKey which length is less than 256", () => {
    let event = { partitionKey: "12345" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("12345");
    expect(trivialKey.length).toBeLessThan(256);
  });

  it("Returns a new string when you give a partitionKey which length is longer than 256", () => {
    const bigPartitionKey = "a".repeat(257);
    let event = { partitionKey: bigPartitionKey };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe(bigPartitionKey);
    expect(trivialKey.length).toBeLessThan(256);
  });
  
  it("Returns a new string when you give an empty string", () => {
    let event = { partitionKey: "" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBeDefined();
    expect(trivialKey.length).toBeLessThan(256);
  });
});



// dpkRefactor testing
describe("dpkRefactor", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = dpkRefactor();
    expect(trivialKey).toBe("0");
  });
  
  it("Returns string when you give a number variable", () => {
    let event = { partitionKey: 12345 };
    const trivialKey = dpkRefactor(event);
    expect(trivialKey).toBe("12345");
    expect(trivialKey.length).toBeLessThan(256);
  });

  it("Returns string when you give a object variable", () => {
    let event = { partitionKey: {birth: 12345} };
    const trivialKey = dpkRefactor(event);
    expect(trivialKey).toBe("{\"birth\":12345}");
    expect(trivialKey.length).toBeLessThan(256);
  });

  it("Returns same string when you give a partitionKey which length is less than 256", () => {
    const event = { partitionKey: "12345" };
    const trivialKey = dpkRefactor(event);
    expect(trivialKey).toBe("12345");
    expect(trivialKey.length).toBeLessThan(256);
  });

  it("Returns a new string when you give a partitionKey which length is longer than 256", () => {
    const bigPartitionKey = "a".repeat(257);
    const event = { partitionKey: bigPartitionKey };
    const trivialKey = dpkRefactor(event);
    expect(trivialKey).not.toBe(bigPartitionKey);
    expect(trivialKey.length).toBeLessThan(256);
  });
  
  it("Returns a new string when you give an empty string", () => {
    const event = { partitionKey: "" };
    const trivialKey = dpkRefactor(event);
    expect(trivialKey).toBeDefined();
    expect(trivialKey.length).toBeLessThan(256);
  });
});
