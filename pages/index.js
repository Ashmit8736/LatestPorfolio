import Head from 'next/head';
import { useEffect } from 'react';
import PublicLayout from '../components/layout/PublicLayout';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import ServicesSection from '../components/portfolio/ServicesSection';
import ServiceDetailSection from '../components/portfolio/ServiceDetailSection';
import IndustriesSection from '../components/portfolio/IndustriesSection';
import JourneySection from '../components/portfolio/JourneySection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import FaqSection from '../components/portfolio/FaqSection';
import ContactSection from '../components/portfolio/ContactSection';
import { prisma } from '../lib/prisma';

export default function Home({ profile, experiences, education, projects, skills, socials, services, industries, serviceDetail }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  return (
    <PublicLayout>
      <Head>
        <title>{profile?.fullName || 'Portfolio'}</title>
        <meta name="description" content={profile?.headline || 'My Portfolio'} />
      </Head>
      <HeroSection profile={profile} socials={socials} />
      <AboutSection profile={profile} experiences={experiences} projects={projects} skills={skills} />
      <ServicesSection services={services} />
      <ServiceDetailSection detail={serviceDetail} />
      <IndustriesSection industries={industries} />
      <JourneySection experiences={experiences} education={education} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <FaqSection />
      <ContactSection profile={profile} socials={socials} />
    </PublicLayout>
  );
}

export async function getServerSideProps() {
  const profile = await prisma.profile.findFirst() || null;
  const experiences = await prisma.experience.findMany({ orderBy: { startDate: 'desc' } });
  const education = await prisma.education.findMany({ orderBy: { startYear: 'desc' } });
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  const skills = await prisma.skill.findMany();
  const socials = await prisma.socialLink.findMany();
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  const industries = await prisma.industry.findMany({ orderBy: { order: 'asc' } });
  const serviceDetail = await prisma.serviceDetail.findFirst();

  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile)),
      experiences: JSON.parse(JSON.stringify(experiences)),
      education: JSON.parse(JSON.stringify(education)),
      projects: JSON.parse(JSON.stringify(projects)),
      skills: JSON.parse(JSON.stringify(skills)),
      socials: JSON.parse(JSON.stringify(socials)),
      services: JSON.parse(JSON.stringify(services)),
      industries: JSON.parse(JSON.stringify(industries)),
      serviceDetail: JSON.parse(JSON.stringify(serviceDetail)),
    }
  };
}
