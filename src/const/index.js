export const getRandomBG = () => {
  const colors = [
    "bg-[#ff6b6b]",
    "bg-[#6bc1ff]",
    "bg-[#6bff95]",
    "bg-[#ff6bdb]",
    "bg-[#ffc36b]",
    "bg-[#8e6bff]",
    "bg-[#6bffea]",
    "bg-[#ffde6b]",
    "bg-[#ff6b8e]",
    "bg-[#6b8eff]",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
