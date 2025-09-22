exports.askCityBot = async (query) => {
  // Future: integrate HuggingFace free endpoint
  // For now, respond from hardcoded FAQ
  const faq = {
    "belagavi fort": "Belagavi Fort is a historical site built in the 13th century.",
    "food": "Kunda is a famous sweet delicacy unique to Belagavi!"
  };
  return faq[query.toLowerCase()] || "🤖 Sorry, I don't know that yet!";
};