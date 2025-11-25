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
export const getAvatar = (name: string) => {
  if(!name) return "";
  return name.split(' ').map(w => w[0]).join('').toUpperCase()
}
export const formatDate = (date: Date): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
      2,
      "0"
    )}, ${date.getFullYear()}`;
  };

 export const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };