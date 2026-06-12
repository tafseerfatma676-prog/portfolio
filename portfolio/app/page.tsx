import Navbar       from '@/components/Navbar'
import Hero         from '@/components/Hero'
import About        from '@/components/About'
import Services     from '@/components/Services'
import Projects     from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import BlogSection  from '@/components/BlogSection'
import Contact      from '@/components/Contact'
import Footer       from '@/components/Footer'

export default function Home() {
  return (
    <main className="noise">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <BlogSection />
      <Contact />
      <Footer />
    </main>
  )
}
