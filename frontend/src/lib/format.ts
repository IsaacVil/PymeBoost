// Costa Rican colón formatting (mirrors the prototype's CRC helper).
export const crc = (n: number): string => "₡" + Number(n).toLocaleString("es-CR");
