export function getPlatformCta(platform: string | { name?: string } | undefined): string {
  const platformName = typeof platform === 'string' ? platform : platform?.name;
  console.log('getPlatformCta - raw platform:', platform, 'platformName:', platformName);
  switch (platformName) {
    case "Amazon":
      return "View on Amazon";
    case "Flipkart":
      return "View on Flipkart";
    case "Meesho":
      return "View on Meesho";
    case "Myntra":
      return "View on Myntra";
    case "Ajio":
      return "View on Ajio";
    default:
      return "View Find";
  }
}

export function getAffiliateCta(platform: string | { name?: string } | undefined): string {
  const platformName = typeof platform === 'string' ? platform : platform?.name;
  console.log('getAffiliateCta - raw platform:', platform, 'platformName:', platformName);
  switch (platformName) {
    case "Amazon":
      return "Buy on Amazon";
    case "Flipkart":
      return "Buy on Flipkart";
    case "Meesho":
      return "Buy on Meesho";
    case "Myntra":
      return "Buy on Myntra";
    case "Ajio":
      return "Buy on Ajio";
    default:
      return "View Recommendation";
  }
}
