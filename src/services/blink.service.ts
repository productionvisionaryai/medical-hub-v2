export const createBlinkInvoice = async (amountSats: number, memo: string) => {
    const response = await fetch('https://api.blink.sv/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.BLINK_API_KEY!,
        },
        body: JSON.stringify({
            query: `
        mutation LnNoAmountInvoiceCreate($input: LnNoAmountInvoiceCreateInput!) {
          lnNoAmountInvoiceCreate(input: $input) {
            invoice { paymentRequest }
          }
        }
      `,
            variables: { input: { memo } }
        }),
    });
    return response.json();
};
