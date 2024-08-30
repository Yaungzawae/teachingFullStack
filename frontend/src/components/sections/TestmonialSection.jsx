import TestimonialCard from "../cards/TestimonialCard"
import { H1 } from "../typography/typography"
import S1 from "../../assets/S1.jpg"
import S2 from "../../assets/S2.jpg"
import S3 from "../../assets/S3.jpg"


const testimonials = [
    {
      id: 1,
      image: S1,
      quote: "原本已經很喜歡泰國，然後最近開始追星、追泰劇，因為想聽得懂他們說的話，所以就著手開始學泰文。然後遇到kru Cho 團隊，上了kru小敏的課堂。老師他真的很好，很好的教導模式，很會用日常生活的話題、用語跟我們解釋，解釋得很清楚，讓大家容易明白，上課的氣氛也營造的很好，輕鬆愉快。我們剛剛完成了LV1，現在正在LV2了。我完成LV1後，再去泰國的時候，老師教的東西很有用喔，感覺很滿足🥰 期待LV3",
      name: "Amber Lopez",
      align: 'left'
    },
    {
      id: 2,
      image: S2,
      quote: "上的是L1小玲老師的課，因為自己喜歡追泰星看泰劇聽泰文歌等，所以就想來學泰文，找到了Kru cho的團隊。小玲老師的課讓我收穫很多，會教很多課外的詞彙，有問題隨時都能提問，有時候還會講小笑話或是分享一些泰國文化，一開始很擔心自己能不能學好泰文，上了L1的課完發現現在不管是看泰劇或是聽泰文歌等都能聽出一些詞了，覺得很開心。之後有時間一定會繼續把L2上完的。",
      name: "Angela",
      align: 'right'
    },
    {
      id: 3,
      image: S3,
      quote: "原本已經很喜歡泰國，然後最近開始追星、追泰劇，因為想聽得懂他們說的話，所以就著手開始學泰文。然後遇到kru Cho 團隊，上了kru小敏的課堂。老師他真的很好，很好的教導模式，很會用日常生活的話題、用語跟我們解釋，解釋得很清楚，讓大家容易明白，上課的氣氛也營造的很好，輕鬆愉快。我們剛剛完成了LV1，現在正在LV2了。我完成LV1後，再去泰國的時候，老師教的東西很有用喔，感覺很滿足期待LV3、LV4…….😎。",
      name: "Riva",
      align: 'left'
    }
  ];

export const TestmonialSection = ({}) => {

    const lang = localStorage.getItem("language");


    return (
        <div className="px-8 py-6 max-w-[1000px] mx-auto">
        <H1 className="text-black text-center my-8">{lang == "en" ? "Testmonials":"感言"}</H1>
    {testimonials.map(testimonial => (
      <TestimonialCard
        key={testimonial.id}
        image={testimonial.image}
        quote={testimonial.quote}
        name={testimonial.name}
        title={testimonial.title}
        align={testimonial.align}
      />
    ))}
  </div>
    )
}
