export const whatsappNumber = "5585987654321";

export const defaultWhatsappMessage =
  "Olá! Vim pelo site da EC EMY COMÉRCIO e gostaria de conhecer as peças em destaque.";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

