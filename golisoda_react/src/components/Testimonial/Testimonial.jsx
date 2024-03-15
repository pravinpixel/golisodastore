import React from 'react'
import Slider from "react-slick";
import aryarajamImage from 'assets/testimonial/aryarajam.png'
import shwetaVermaImage from 'assets/testimonial/shweta-verma.png'
import juhisharmaImage from 'assets/testimonial/juhisharma.png'
import kiransampathImage from 'assets/testimonial/kiransampath.png'
import shringamuraliImage from 'assets/testimonial/shringamurali.png'
import seemamassotImage from 'assets/testimonial/seemamassot.png'
import nithyaramachandranImage from 'assets/testimonial/nithyaramachandran.png'
import jananilakshminarayanImage from 'assets/testimonial/jananilakshminarayan.png'
import shreyanagarajanImage from 'assets/testimonial/shreyanagarajan.png'
import './styles.scss'
import { useState } from 'react';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="patron-detil">
      {isReadMore ? text.slice(0, 200) : text}
      {text?.length > 200 &&

        <p
          onClick={toggleReadMore}
          className="read-or-hide mt-2"
          style={{ color: "white", cursor: 'pointer' }}
        >
          {isReadMore ? "Read More" : "Read Less"}
        </p>
      }
    </div>
  );
};

function TestimonialSlider() {

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipe: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    // slidesToShow: slidesToShow === undefined ? (subcategoryCollections?.length > 3 ? 4 : 3) : 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonailContent = [
    {
      feedback: "Goli Soda has always impressed me with their range of eco-friendly products that inspired me to switch over to sustainable living. Their lovely products have great quality. Most importantly, the green message that they propagate makes them one of the most fantastic stores in India.",
      name: "Arya Rajam",
      image: aryarajamImage
    },
    {
      feedback: "I used Goli Soda Probiotics Facewash Bar for the first time in Dec 2020 and it just got over in Feb 2021. This is the only soap in my life that I am using till I use its last bit :) wonderful for my skin and feels great! And considering that it has lasted 60 days... makes it value for money too!!",
      name: "Shweta Verma",
      image: shwetaVermaImage
    },
    {
      feedback: "I've been Goli Soda's customer for quite a few years now. Started with the cloth pads, moved to the bamboo tooth brush and now the shampoo bars, amongst the other little things that I love picking out from their store. The quality is so good, it completely shatters the notion that eco-friendly products aren't effective or durable. I also love the information that comes with all the products. It moves me along this journey of eco-friendly living that started with them!",
      name: "Juhi Sharma",
      image: juhisharmaImage
    },
    {
      feedback: "Goli Soda has been my go-to brand for eco friendly and conscious products that are not just sustainable but also quirky. They've been so responsive even through the lockdown and stocked up on reusable feminine hygiene products that were not available anywhere else. They are the only brand that I know of in Chennai, that sell compost bins of multiple sizes. This product has really transformed the amount of waste that my house generates and we're so grateful for that.Goli Soda has has really helped us live mindfully even during the pandemic.If you're looking for sustainable products then Goli Soda must be on your list!",
      name: "Kiran Sampath",
      image: kiransampathImage
    },
    {
      feedback: "My journey towards a more sustainable and eco-friendly life began with Goli Soda. From switching to menstrual cups to composting, Goli Soda has always been there to clarify any doubts I might have.In fact, it is because of Goli Soda that I got my entire apartment complex to start composting their food, and now we have a flourishing little garden in our compound.I also bought their shampoo bars, that come in neat eco- friendly packages, and its been such a lovely experience using them.It is so great to have a store that not only encourages an eco - friendly lifestyle, but also ensures that it is a smooth and hassle - free experience so we can continue living sustainably!",
      name: "Shringa Murali",
      image: shringamuraliImage
    },
    {
      feedback: "I have been an admirer and loyal customer of Goli Soda since 2013! Their upcycled products, sustainable alternatives and eco-friendly solutions. Their upcycled bags have been my staple for gifts, their expert contemporary design of traditional products are functional and aesthetically pleasing. I also love that Goli Soda advises on sustainable living at their store and through social media. Goli Soda's offering of alternative menstrual and baby care products is a highlight for me as it's the most intimate way of making sustainable choices.",
      name: "Seema Massot",
      image: seemamassotImage
    },
    {
      feedback: "My association with Goli Soda started with their physical store in Chennai many years ago. I fell in love with the quirky products and the store became my go to place to buy unique gifts for my friends. Their online store is very well organised and has made my sustainability journey a lot easier.",
      name: "Nithya Ramachandran",
      image: nithyaramachandranImage
    },
    {
      feedback: "Goli Soda has been a favourite store to visit ever since I decided to live a life of mindful consumption. The quality of the products, especially the soaps and eco-friendly home essentials is simply outstanding. When my children use Goli Soda All Natural probiotics dishwash bar to wash their plates and cutlery after their meal, I don't have to worry about the prolonged effect of the soap on their gentle, sensitive skin. Goli Soda is special to me for another reason, for coming to my rescue when I was faced with a delicate situation. In a bizzare accident, I burnt both my menstrual cups due to negligence while sterilizing them at a time when I had a pressing need. It was Sruti and the staff at Goli Soda store whose timely help saved my day! Happy to call myself a patron of a store that is a flag bearer of sustainable practices through mindful consumption of environment-friendly products. Double 👍👍 !",
      name: "Janani Lakshminarayan",
      image: jananilakshminarayanImage
    },
    {
      feedback: "When I think of reusable products or eco-friendly products, Goli Soda is at the top of my list. In addition, it's a matter of pride for me that this brand was birthed in Chennai. I started moving towards sustainable living through their various products from cloth pads, bamboo toothbrush, soap, shampoo etc. Beyond their stellar products I really admire the consciousness of the brand - how they reflect it in their client servicing, display and how they work hard to stand by their values and quality of their products. It's brands like Goli Soda that give me hope that we as a society will be able to access and transition to a more eco friendly lifestyle.",
      name: "Shreya Nagarajan Singh",
      image: shreyanagarajanImage
    }
  ]

  return (
    <div className="section-wrapper bg-white">
      <div className="container">
        <h2 className="section-title">What our patrons are saying about Goli Soda?</h2>
        <div className="row g-3 arrival-slider">
          <Slider {...settings}>
            {testimonailContent?.map(
              (item, index) =>
                <div key={index}>
                  <div className="patron text-left">
                    {/* <div className="patron-detil"> */}
                    <ReadMore>
                      {item?.feedback}
                    </ReadMore>
                    {/* </div> */}
                    <div className="d-flex justify-content-start align-items-center">
                      <div className="me-3">
                        <img src={item?.image}
                          className="rounded-circle" width="50px" alt="Drums Sivamani" />
                      </div>
                      <div className="fs-5">{item?.name}</div>
                    </div>
                  </div>
                </div>
            )}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider