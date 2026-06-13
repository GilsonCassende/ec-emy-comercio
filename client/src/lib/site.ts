export const whatsappNumber = "244937770235";

export const defaultWhatsappMessage = `Olá, tudo bem?

Gostaria de receber mais informações sobre os produtos disponíveis.

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

Gostaria de receber informações sobre:

• Disponibilidade
• Tamanhos disponíveis
• Cores disponíveis
• Preço

Aguardo o seu atendimento.

Muito obrigado(a).`;
}

export function buildProductWhatsAppLink(input: ProductWhatsAppMessageInput) {
  return buildWhatsAppLink(buildProductWhatsAppMessage(input));
}
