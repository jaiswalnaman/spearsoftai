import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Stats />
      <ContactForm />
    </div>
  );
}