from django.core.management.base import BaseCommand

from teams.models import Team


class Command(BaseCommand):
    help = "Create the initial CricketHub IPL teams"

    TEAMS = [
        {
            "name": "Chennai Super Kings",
            "short_name": "CSK",
            "city": "Chennai",
            "founded_year": 2008,
        },
        {
            "name": "Mumbai Indians",
            "short_name": "MI",
            "city": "Mumbai",
            "founded_year": 2008,
        },
        {
            "name": "Royal Challengers Bengaluru",
            "short_name": "RCB",
            "city": "Bengaluru",
            "founded_year": 2008,
        },
        {
            "name": "Kolkata Knight Riders",
            "short_name": "KKR",
            "city": "Kolkata",
            "founded_year": 2008,
        },
        {
            "name": "Sunrisers Hyderabad",
            "short_name": "SRH",
            "city": "Hyderabad",
            "founded_year": 2013,
        },
        {
            "name": "Rajasthan Royals",
            "short_name": "RR",
            "city": "Jaipur",
            "founded_year": 2008,
        },
        {
            "name": "Delhi Capitals",
            "short_name": "DC",
            "city": "Delhi",
            "founded_year": 2008,
        },
        {
            "name": "Punjab Kings",
            "short_name": "PBKS",
            "city": "Punjab",
            "founded_year": 2008,
        },
        {
            "name": "Gujarat Titans",
            "short_name": "GT",
            "city": "Ahmedabad",
            "founded_year": 2022,
        },
        {
            "name": "Lucknow Super Giants",
            "short_name": "LSG",
            "city": "Lucknow",
            "founded_year": 2022,
        },
    ]

    def handle(self, *args, **options):
        created_count = 0
        existing_count = 0

        for team_data in self.TEAMS:
            team, created = Team.objects.get_or_create(
                short_name=team_data["short_name"],
                defaults=team_data,
            )

            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created: {team.name}"
                    )
                )
            else:
                existing_count += 1
                self.stdout.write(
                    self.style.WARNING(
                        f"Already exists: {team.name}"
                    )
                )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                f"Created teams: {created_count}"
            )
        )

        self.stdout.write(
            self.style.WARNING(
                f"Existing teams: {existing_count}"
            )
        )