import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "Trouver un coach qui comprend mes objectifs n’a jamais été aussi facile. Grâce à cette plateforme, j’ai enfin pu suivre un programme de sport personnalisé qui correspond parfaitement à mes attentes. Je recommande à 100 % !",
      name: "Sanae R.",
      rating: 5,
      image: "/avatar/pexels-ketut-subiyanto-4909509.jpg",
    },
    {
      text: "Le site m’a permis de réserver des cours rapidement avec un coach de qualité. Je suis impressionnée par la simplicité du processus et la compétence des coachs. Je suis plus en forme que jamais !",
      name: "Karim B.",
      rating: 5,
      image: "/avatar/pexels-olly-3785079.jpg",
    },
    {
      text: "J’avais du mal à trouver une coach femme près de chez moi, mais ce site m’a facilité la tâche. Mon coach, Laura K., est professionnelle et me motive à chaque séance. Une vraie perle !",
      name: "Laura M.",
      rating: 5,
      image: "/avatar/pexels-photo-10110685.jpeg",
    },
  ];

  return (
    <div className="p-8 text-center min-h-[920px]">
      <img src="/resized_image-removebg-preview.png" alt="Hero" className="w-[600px] h-[642px] object-cover mb-6 mx-auto" />
      <h2 className="text-2xl font-bold text-[#004e98] mb-8 ">
        Nos anciens élèves évaluent leurs profs
      </h2>
      
      <div className="flex flex-col gap-[0.9rem] bg-[#004e98] p-[0.9rem] rounded-lg shadow-lg mt-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex items-start gap-[0.4rem] bg-white p-[0.4rem] rounded-lg shadow">
            <img src={testimonial.image} alt={testimonial.name} className="w-[45px] h-[45px] rounded-full object-cover shadow-sm" />
            <div className="flex-1 p-[0.7rem] rounded-lg">
              <p className="text-[0.9rem] text-gray-800 mb-[0.2rem] leading-tight">"{testimonial.text}"</p>
              <p className="text-[0.85rem] font-bold text-gray-600 mb-[0.25rem]">— {testimonial.name}</p>
              <div className="text-[#ff6600] text-[1rem]">{"★".repeat(testimonial.rating)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
