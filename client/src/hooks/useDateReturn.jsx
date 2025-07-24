function formatDate(createdAt) {
    return new Date(createdAt).toLocaleString("tr-TR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default formatDate;
