const formatThaiDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const weekdayLabels = ["อ.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
    const monthLabels = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "UTC",
    };

    const formattedDateTime = date.toLocaleString("th-TH", options);

    const formattedThaiDateTime = formattedDateTime
      .replace(
        new RegExp(`\\b(${options.weekday})\\b`),
        (match) => weekdayLabels[date.getDay()]
      )
      .replace(
        new RegExp(`\\b(${options.month})\\b`),
        (match) => monthLabels[date.getMonth()]
      )
      .replace(/น.$/, "น.");

    const regex = /(\d{2})(?=:)/;
    const match = dateTimeString.match(regex);
    const result = match && match[0];

    return `${formattedThaiDateTime} - ${
      parseInt(result) + 1
    }.00 น.`;

  };

export default formatThaiDateTime;