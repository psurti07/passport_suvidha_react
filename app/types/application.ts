export interface ApplicationStage {
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface ApplicationProgress {
  progress_percentage: number;
  estimated_completion: string;
  stages: ApplicationStage[];
  current_stage: string;
  created_at: string;
} 