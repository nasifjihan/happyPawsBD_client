export const formatOrderDateTime = (value) => {
  if (!value) {
    return "";
  }

  try {
    return new Date(value).toLocaleString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return String(value);
  }
};

export const getOrderStatusChipColor = (value) => {
  const normalized = String(value || "").toLowerCase();

  if (["paid"].includes(normalized)) {
    return "success";
  }

  if (
    ["pending_payment", "checkout_started", "created", "unpaid"].includes(
      normalized
    )
  ) {
    return "warning";
  }

  if (["payment_failed", "failed", "cancelled"].includes(normalized)) {
    return "error";
  }

  return "default";
};

export const formatOrderMethodLabel = (value) => {
  const normalized = String(value || "").trim();

  if (normalized === "cash_on_delivery") {
    return "Cash on Delivery";
  }

  if (normalized === "online_payment") {
    return "Online Payment";
  }

  return normalized || "Unknown";
};
