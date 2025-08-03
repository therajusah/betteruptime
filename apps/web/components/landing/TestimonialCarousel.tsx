import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  current: number;
  setCurrent: (index: number) => void;
}

export function TestimonialCarousel({ testimonials, current, setCurrent }: TestimonialCarouselProps) {
  const test = testimonials[current];
  return (
    <div className="relative bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl overflow-hidden select-none">
      <div className="flex items-center mb-8 gap-4">
        <img
          src={test.image}
          alt={test.name}
          className="w-14 h-14 rounded-full object-cover opacity-90 shadow-sm"
          loading="lazy"
        />
        <div>
          <h4 className="text-lg font-semibold text-white">{test.name}</h4>
          <p className="text-gray-400 font-light text-sm">{test.role}</p>
        </div>
        <div className="ml-auto flex space-x-1">
          {[...Array(test.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <blockquote className="text-xl text-gray-300 font-light leading-relaxed mb-10">"{test.content}"</blockquote>
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                i === current ? 'bg-green-400' : 'bg-gray-600 hover:bg-green-400'
              }`}
              onClick={() => setCurrent(i)}
              aria-label={`Select testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex space-x-3">
          <button
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Previous testimonial"
            onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>
          <button
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Next testimonial"
            onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
} 