import React from "react";
import { FaCommentDots } from "react-icons/fa"; // Import an icon for the speech bubble
import { H1 } from "../typography/typography";

const ContactSection = () => {
  const items = [
    {
      title: "適合自己的學習資源",
      description:
        "Krucho 官方IG裡包含了許多費用免費教學影片，生活常用語，英文歌曲教學...",
      footer: "Krucho 個人教學IG：krucho_thailanguage",
    },
    {
      title: "跟母語者一起學習",
      description:
        "教研團隊均為母語教師，且每位老師都會說流利的中文，用最熟悉的語言學習泰語。",
      footer: "每個老師的教學風格：krucho_official",
    },
    {
      title: "有問題多詢問",
      description:
        "學習過程中有問題，馬上到我們的Line群組致文，其他關於泰國大小事也都能詢問。",
      footer: "Line Open Chat:",
    },
  ];

  return (
    <div className="text-center py-8 px-4">
      <H1 className="mb-12">
        泰語學習三要素，你掌握了嗎
      </H1>
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        {items.map((item, index) => (
          <div key={index} className="max-w-sm mx-auto">
            <FaCommentDots className="text-orange-500 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700 mb-4">
              {item.description}
            </p>
            <p className="text-gray-600">
              {item.footer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;