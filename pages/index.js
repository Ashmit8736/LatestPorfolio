import Head from 'next/head';
import PublicLayout from '../components/layout/PublicLayout';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import EducationSection from '../components/portfolio/EducationSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ContactSection from '../components/portfolio/ContactSection';
import { prisma } from '../lib/prisma';

export default function Home({ profile, experiences, education, projects, skills, socials }) {
  return (
    <PublicLayout>
      <Head>
        <title>{profile?.fullName || 'Portfolio'}</title>
        <meta name="description" content={profile?.headline || 'My Portfolio'} />
      </Head>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ExperienceSection experiences={experiences} />
      <EducationSection education={education} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <ContactSection />
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

  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile)),
      experiences: JSON.parse(JSON.stringify(experiences)),
      education: JSON.parse(JSON.stringify(education)),
      projects: JSON.parse(JSON.stringify(projects)),
      skills: JSON.parse(JSON.stringify(skills)),
      socials: JSON.parse(JSON.stringify(socials)),
    }
  };
}