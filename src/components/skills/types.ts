export type SkillCategory = 'languages' | 'analysis' | 'cloud' | 'ml' | 'databases';

export type ProficiencyLevel = 'Advanced' | 'Intermediate' | 'Beginner';

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  usageContext: string;
  color: string;
}

export interface SkillCardProps {
  skill: Skill;
}

export interface SkillsGridProps {
  skills: Skill[];
  showCategories?: boolean;
}

export const categoryLabels: Record<SkillCategory, string> = {
  languages: 'Programming Languages',
  analysis: 'Data Analysis & Visualization',
  cloud: 'Data Pipeline & Cloud',
  ml: 'Machine Learning & MLOps',
  databases: 'Databases & Tools',
};

export const skills: Skill[] = [
  // Programming Languages
  { name: 'Python', category: 'languages', proficiency: 'Advanced', usageContext: 'Used in Invoice Pipeline', color: '#3776AB' },
  { name: 'SQL', category: 'languages', proficiency: 'Advanced', usageContext: 'Data modeling & queries', color: '#4479A1' },
  { name: 'R', category: 'languages', proficiency: 'Intermediate', usageContext: 'Statistical analysis', color: '#276DC3' },
  { name: 'JavaScript', category: 'languages', proficiency: 'Intermediate', usageContext: 'Web development', color: '#F7DF1E' },
  { name: 'Java', category: 'languages', proficiency: 'Intermediate', usageContext: 'Backend services', color: '#ED8B00' },

  // Data Analysis & Visualization
  { name: 'Pandas', category: 'analysis', proficiency: 'Intermediate', usageContext: 'Data wrangling', color: '#150458' },
  { name: 'NumPy', category: 'analysis', proficiency: 'Intermediate', usageContext: 'Numerical computing', color: '#013243' },
  { name: 'Matplotlib', category: 'analysis', proficiency: 'Intermediate', usageContext: 'Static visualizations', color: '#11557C' },
  { name: 'Seaborn', category: 'analysis', proficiency: 'Intermediate', usageContext: 'Statistical plots', color: '#4C72B0' },
  { name: 'Power BI', category: 'analysis', proficiency: 'Intermediate', usageContext: 'Revenue dashboards', color: '#F2C811' },
  { name: 'Tableau', category: 'analysis', proficiency: 'Intermediate', usageContext: 'Interactive dashboards', color: '#E97627' },
  { name: 'Looker', category: 'analysis', proficiency: 'Intermediate', usageContext: 'Data exploration', color: '#4285F4' },

  // Data Pipeline & Cloud
  { name: 'dbt', category: 'cloud', proficiency: 'Beginner', usageContext: 'Data transformations', color: '#FF694A' },
  { name: 'AWS', category: 'cloud', proficiency: 'Advanced', usageContext: 'Cloud infrastructure', color: '#FF9900' },
  { name: 'Snowflake', category: 'cloud', proficiency: 'Beginner', usageContext: 'Data warehousing', color: '#29B5E8' },
  { name: 'Apache Spark', category: 'cloud', proficiency: 'Beginner', usageContext: 'Big data processing', color: '#E25A1C' },

  // Machine Learning & MLOps
  { name: 'scikit-learn', category: 'ml', proficiency: 'Intermediate', usageContext: 'ML modeling', color: '#F7931E' },
  { name: 'MLflow', category: 'ml', proficiency: 'Intermediate', usageContext: 'Experiment tracking', color: '#0194E2' },

  // Databases & Tools
  { name: 'PostgreSQL', category: 'databases', proficiency: 'Intermediate', usageContext: 'Primary database', color: '#4169E1' },
  { name: 'MySQL', category: 'databases', proficiency: 'Intermediate', usageContext: 'Relational data', color: '#4479A1' },
  { name: 'MongoDB', category: 'databases', proficiency: 'Intermediate', usageContext: 'Document storage', color: '#47A248' },
  { name: 'Git', category: 'databases', proficiency: 'Intermediate', usageContext: 'Version control', color: '#F05032' },
  { name: 'FastAPI', category: 'databases', proficiency: 'Intermediate', usageContext: 'API development', color: '#009688' },
];
