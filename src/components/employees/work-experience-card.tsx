import type { WorkExperience } from '@/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History } from 'lucide-react';
import { format } from 'date-fns';

export function WorkExperienceCard({ experience }: { experience?: WorkExperience[] }) {
  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="relative pl-6 before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-border last:before:h-0">
             <div className="absolute -left-0.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
            <h3 className="font-semibold">{exp.position} at {exp.companyName}</h3>
            <p className="text-sm text-muted-foreground">{exp.location}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(exp.startDate), 'MMM yyyy')} - {format(new Date(exp.endDate), 'MMM yyyy')}
            </p>
            {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="mt-2 list-disc pl-5 space-y-1">
                    {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{resp}</li>
                    ))}
                </ul>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
