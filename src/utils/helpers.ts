export const validateEthereumAddress = (address: string) => {
    const txt_1 = address.slice(0, 2);
    const txt_2 = address.slice(2, address.length);
    if (txt_1 !== "0x") {
      return false;
    }

    if (txt_1 === "0x" && txt_2.length > 5) {
      return true;
    }
};