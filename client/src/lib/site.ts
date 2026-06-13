export const whatsappNumber = "244937770235";
export const whatsappDisplayNumber = "+244 937 770 235";
export const whatsappSupportHours = "7h às 23h";

export const defaultWhatsappMessage = `Olá, tudo bem?

Gostaria de receber atendimento sobre as peças disponíveis.

Queria confirmar disponibilidade, tamanhos, preço e entrega.

Aguardo o seu atendimento.

Muito obrigado(a).`;

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

type ProductWhatsAppMessageInput = {
  productName: string;
  productCode: string;
  category: string;
};

export function buildProductWhatsAppMessage({
  productName,
  productCode,
  category,
}: ProductWhatsAppMessageInput) {
  return `Olá, tudo bem?

Tenho interesse no seguinte produto da EC EMY COMÉRCIO:

🛍️ Produto: ${productName}

🏷️ Código: ${productCode}

📂 Categoria: ${category}

Gostaria de confirmar:

• Disponibilidade
• Tamanhos disponíveis
• Cores disponíveis
• Preço
• Possibilidade de reserva
• Entrega

Aguardo o seu atendimento.

Muito obrigado(a).`;
}

export function buildProductWhatsAppLink(input: ProductWhatsAppMessageInput) {
  return buildWhatsAppLink(buildProductWhatsAppMessage(input));
}
