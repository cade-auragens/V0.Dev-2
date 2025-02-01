"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface SubdivisionDropdownProps {
  onSubdivisionSelect: (subdivision: string, conference: string, team: string) => void
  sport: "football" | "basketball" | "hockey" | "baseball"
}

const FBS_CONFERENCES = {
  "Atlantic Coast Conference (ACC)": [
    "Boston College",
    "Clemson",
    "Duke",
    "Florida State",
    "Georgia Tech",
    "Louisville",
    "Miami (FL)",
    "North Carolina",
    "NC State",
    "Pittsburgh",
    "Syracuse",
    "Virginia",
    "Virginia Tech",
    "Wake Forest",
  ],
  "Big Ten Conference": [
    "Illinois",
    "Indiana",
    "Iowa",
    "Maryland",
    "Michigan",
    "Michigan State",
    "Minnesota",
    "Nebraska",
    "Northwestern",
    "Ohio State",
    "Penn State",
    "Purdue",
    "Rutgers",
    "Wisconsin",
  ],
  "Big 12 Conference": [
    "Baylor",
    "BYU",
    "Cincinnati",
    "Houston",
    "Iowa State",
    "Kansas",
    "Kansas State",
    "Oklahoma State",
    "TCU",
    "Texas Tech",
    "UCF",
    "West Virginia",
  ],
  "Pac-12 Conference": [
    "Arizona",
    "Arizona State",
    "California",
    "Colorado",
    "Oregon",
    "Oregon State",
    "Stanford",
    "UCLA",
    "USC",
    "Utah",
    "Washington",
    "Washington State",
  ],
  "Southeastern Conference (SEC)": [
    "Alabama",
    "Arkansas",
    "Auburn",
    "Florida",
    "Georgia",
    "Kentucky",
    "LSU",
    "Mississippi State",
    "Missouri",
    "Ole Miss",
    "South Carolina",
    "Tennessee",
    "Texas A&M",
    "Vanderbilt",
  ],
  "American Athletic Conference (AAC)": [
    "Charlotte",
    "East Carolina",
    "Florida Atlantic",
    "Memphis",
    "Navy",
    "North Texas",
    "Rice",
    "SMU",
    "South Florida",
    "Temple",
    "Tulane",
    "Tulsa",
    "UAB",
    "UTSA",
  ],
  "Conference USA (C-USA)": [
    "FIU",
    "Jacksonville State",
    "Liberty",
    "Louisiana Tech",
    "Middle Tennessee",
    "New Mexico State",
    "Sam Houston",
    "UTEP",
    "Western Kentucky",
  ],
  "Mid-American Conference (MAC)": [
    "Akron",
    "Ball State",
    "Bowling Green",
    "Buffalo",
    "Central Michigan",
    "Eastern Michigan",
    "Kent State",
    "Miami (OH)",
    "Northern Illinois",
    "Ohio",
    "Toledo",
    "Western Michigan",
  ],
  "Mountain West Conference (MWC)": [
    "Air Force",
    "Boise State",
    "Colorado State",
    "Fresno State",
    "Hawaii",
    "Nevada",
    "New Mexico",
    "San Diego State",
    "San Jose State",
    "UNLV",
    "Utah State",
    "Wyoming",
  ],
  "Sun Belt Conference": [
    "Appalachian State",
    "Arkansas State",
    "Coastal Carolina",
    "Georgia Southern",
    "Georgia State",
    "James Madison",
    "Louisiana",
    "Marshall",
    "Old Dominion",
    "South Alabama",
    "Southern Miss",
    "Texas State",
    "Troy",
    "ULM",
  ],
  "FBS Independent Schools": ["Army", "Notre Dame", "UConn", "UMass"],
}

const FCS_CONFERENCES = {
  "Big Sky Conference": [
    "Cal Poly",
    "Eastern Washington",
    "Idaho",
    "Idaho State",
    "Montana",
    "Montana State",
    "Northern Arizona",
    "Northern Colorado",
    "Portland State",
    "Sacramento State",
    "UC Davis",
    "Weber State",
  ],
  "Big South Conference": ["Bryant", "Charleston Southern", "Gardner-Webb", "Robert Morris"],
  "Colonial Athletic Association (CAA)": [
    "Albany",
    "Delaware",
    "Elon",
    "Hampton",
    "Maine",
    "Monmouth",
    "New Hampshire",
    "Rhode Island",
    "Richmond",
    "Stony Brook",
    "Towson",
    "Villanova",
    "William & Mary",
  ],
  "Ivy League": ["Brown", "Columbia", "Cornell", "Dartmouth", "Harvard", "Penn", "Princeton", "Yale"],
  "Missouri Valley Football Conference (MVFC)": [
    "Illinois State",
    "Indiana State",
    "Missouri State",
    "North Dakota",
    "North Dakota State",
    "Northern Iowa",
    "South Dakota",
    "South Dakota State",
    "Southern Illinois",
    "Western Illinois",
    "Youngstown State",
  ],
  "Ohio Valley Conference (OVC)": [
    "Eastern Illinois",
    "Lindenwood",
    "Southeast Missouri State",
    "Tennessee State",
    "Tennessee Tech",
    "UT Martin",
  ],
  "Patriot League": ["Bucknell", "Colgate", "Fordham", "Georgetown", "Holy Cross", "Lafayette", "Lehigh"],
  "Pioneer Football League": [
    "Butler",
    "Davidson",
    "Dayton",
    "Drake",
    "Marist",
    "Morehead State",
    "Presbyterian",
    "San Diego",
    "St. Thomas (MN)",
    "Valparaiso",
  ],
  "Southern Conference (SoCon)": [
    "Chattanooga",
    "The Citadel",
    "ETSU (East Tennessee State)",
    "Furman",
    "Mercer",
    "Samford",
    "VMI",
    "Western Carolina",
    "Wofford",
  ],
  "Southland Conference": [
    "Houston Christian",
    "Incarnate Word",
    "Lamar",
    "McNeese State",
    "Nicholls State",
    "Northwestern State",
    "Southeastern Louisiana",
    "Texas A&M-Commerce",
  ],
  "Southwestern Athletic Conference (SWAC)": [
    "Alabama A&M",
    "Alabama State",
    "Alcorn State",
    "Bethune-Cookman",
    "Florida A&M",
    "Grambling State",
    "Jackson State",
    "Mississippi Valley State",
    "Prairie View A&M",
    "Southern",
    "Texas Southern",
    "UAPB (Arkansas-Pine Bluff)",
  ],
  "FCS Independent Schools": ["North Carolina A&T"],
}

const BASKETBALL_CONFERENCES = {
  "America East Conference": [
    "Albany",
    "Binghamton",
    "Bryant",
    "Maine",
    "New Hampshire",
    "NJIT",
    "UMass Lowell",
    "UMBC",
    "Vermont",
  ],
  "American Athletic Conference (AAC)": [
    "Charlotte",
    "East Carolina",
    "Florida Atlantic",
    "Memphis",
    "North Texas",
    "Rice",
    "SMU",
    "South Florida",
    "Temple",
    "Tulane",
    "Tulsa",
    "UAB",
    "UTSA",
    "Wichita State",
  ],
  "Atlantic 10 Conference (A-10)": [
    "Davidson",
    "Dayton",
    "Duquesne",
    "Fordham",
    "George Mason",
    "George Washington",
    "La Salle",
    "Loyola Chicago",
    "Massachusetts (UMass)",
    "Rhode Island",
    "Richmond",
    "St. Bonaventure",
    "Saint Joseph's",
    "Saint Louis",
    "VCU (Virginia Commonwealth)",
  ],
  "Atlantic Coast Conference (ACC)": [
    "Boston College",
    "Clemson",
    "Duke",
    "Florida State",
    "Georgia Tech",
    "Louisville",
    "Miami (FL)",
    "North Carolina",
    "NC State",
    "Notre Dame",
    "Pittsburgh",
    "Syracuse",
    "Virginia",
    "Virginia Tech",
    "Wake Forest",
  ],
  "ASUN Conference": [
    "Austin Peay",
    "Bellarmine",
    "Central Arkansas",
    "Eastern Kentucky",
    "FGCU (Florida Gulf Coast)",
    "Jacksonville",
    "Jacksonville State",
    "Kennesaw State",
    "Liberty",
    "Lipscomb",
    "North Alabama",
    "North Florida",
    "Queens (NC)",
    "Stetson",
  ],
  "Big East Conference": [
    "Butler",
    "Creighton",
    "DePaul",
    "Georgetown",
    "Marquette",
    "Providence",
    "Seton Hall",
    "St. John's",
    "UConn (Connecticut)",
    "Villanova",
    "Xavier",
  ],
  "Big Sky Conference": [
    "Eastern Washington",
    "Idaho",
    "Idaho State",
    "Montana",
    "Montana State",
    "Northern Arizona",
    "Northern Colorado",
    "Portland State",
    "Sacramento State",
    "Weber State",
  ],
  "Big South Conference": [
    "Campbell",
    "Charleston Southern",
    "Gardner-Webb",
    "High Point",
    "Longwood",
    "Presbyterian",
    "Radford",
    "UNC Asheville",
    "USC Upstate",
    "Winthrop",
  ],
  "Big Ten Conference": [
    "Illinois",
    "Indiana",
    "Iowa",
    "Maryland",
    "Michigan",
    "Michigan State",
    "Minnesota",
    "Nebraska",
    "Northwestern",
    "Ohio State",
    "Penn State",
    "Purdue",
    "Rutgers",
    "Wisconsin",
  ],
  "Big 12 Conference": [
    "Baylor",
    "BYU",
    "Cincinnati",
    "Houston",
    "Iowa State",
    "Kansas",
    "Kansas State",
    "Oklahoma State",
    "TCU (Texas Christian)",
    "Texas Tech",
    "UCF (Central Florida)",
    "West Virginia",
  ],
  "Big West Conference": [
    "Cal Poly",
    "Cal State Bakersfield",
    "Cal State Fullerton",
    "Hawaii",
    "Long Beach State",
    "UC Davis",
    "UC Irvine",
    "UC Riverside",
    "UC San Diego",
    "UC Santa Barbara",
  ],
  "Colonial Athletic Association (CAA)": [
    "Campbell",
    "Delaware",
    "Drexel",
    "Elon",
    "Hampton",
    "Hofstra",
    "Monmouth",
    "North Carolina A&T",
    "Northeastern",
    "Stony Brook",
    "Towson",
    "UNC Wilmington (UNCW)",
    "William & Mary",
  ],
  "Conference USA (C-USA)": [
    "FIU (Florida International)",
    "Jacksonville State",
    "Liberty",
    "Louisiana Tech",
    "Middle Tennessee",
    "New Mexico State",
    "Sam Houston",
    "UTEP (Texas-El Paso)",
    "Western Kentucky",
  ],
  "Horizon League": [
    "Cleveland State",
    "Detroit Mercy",
    "Green Bay",
    "IUPUI",
    "Milwaukee",
    "Northern Kentucky",
    "Oakland",
    "Purdue Fort Wayne",
    "Robert Morris",
    "Wright State",
    "Youngstown State",
  ],
  "Ivy League": [
    "Brown",
    "Columbia",
    "Cornell",
    "Dartmouth",
    "Harvard",
    "Penn (University of Pennsylvania)",
    "Princeton",
    "Yale",
  ],
  "Metro Atlantic Athletic Conference (MAAC)": [
    "Canisius",
    "Fairfield",
    "Iona",
    "Manhattan",
    "Marist",
    "Mount St. Mary's",
    "Niagara",
    "Quinnipiac",
    "Rider",
    "Saint Peter's",
    "Siena",
  ],
  "Mid-American Conference (MAC)": [
    "Akron",
    "Ball State",
    "Bowling Green",
    "Buffalo",
    "Central Michigan",
    "Eastern Michigan",
    "Kent State",
    "Miami (OH)",
    "Northern Illinois",
    "Ohio",
    "Toledo",
    "Western Michigan",
  ],
  "Mid-Eastern Athletic Conference (MEAC)": [
    "Coppin State",
    "Delaware State",
    "Howard",
    "Maryland Eastern Shore",
    "Morgan State",
    "Norfolk State",
    "North Carolina Central",
    "South Carolina State",
  ],
  "Missouri Valley Conference (MVC)": [
    "Belmont",
    "Bradley",
    "Drake",
    "Evansville",
    "Illinois State",
    "Indiana State",
    "Missouri State",
    "Murray State",
    "Northern Iowa",
    "Southern Illinois",
    "Valparaiso",
  ],
  "Mountain West Conference (MWC)": [
    "Air Force",
    "Boise State",
    "Colorado State",
    "Fresno State",
    "Nevada",
    "New Mexico",
    "San Diego State",
    "San Jose State",
    "UNLV (Nevada-Las Vegas)",
    "Utah State",
    "Wyoming",
  ],
  "Northeast Conference (NEC)": [
    "Central Connecticut",
    "Fairleigh Dickinson",
    "LIU (Long Island University)",
    "Merrimack",
    "Sacred Heart",
    "St. Francis (Brooklyn)",
    "St. Francis (PA)",
    "Stonehill",
    "Wagner",
  ],
  "Ohio Valley Conference (OVC)": [
    "Eastern Illinois",
    "Lindenwood",
    "Little Rock",
    "Morehead State",
    "Southeast Missouri State",
    "Southern Indiana",
    "Tennessee State",
    "Tennessee Tech",
    "UT Martin",
  ],
  "Pac-12 Conference": [
    "Arizona",
    "Arizona State",
    "California (Cal)",
    "Colorado",
    "Oregon",
    "Oregon State",
    "Stanford",
    "UCLA",
    "USC",
    "Utah",
    "Washington",
    "Washington State",
  ],
  "Patriot League": [
    "American",
    "Army West Point",
    "Boston University",
    "Bucknell",
    "Colgate",
    "Holy Cross",
    "Lafayette",
    "Lehigh",
    "Loyola Maryland",
    "Navy",
  ],
  "Southeastern Conference (SEC)": [
    "Alabama",
    "Arkansas",
    "Auburn",
    "Florida",
    "Georgia",
    "Kentucky",
    "LSU (Louisiana State)",
    "Mississippi State",
    "Missouri",
    "Ole Miss (Mississippi)",
    "South Carolina",
    "Tennessee",
    "Texas A&M",
    "Vanderbilt",
  ],
  "Southern Conference (SoCon)": [
    "Chattanooga",
    "The Citadel",
    "East Tennessee State (ETSU)",
    "Furman",
    "Mercer",
    "Samford",
    "UNC Greensboro",
    "VMI (Virginia Military Institute)",
    "Western Carolina",
    "Wofford",
  ],
  "Southland Conference": [
    "Houston Christian (formerly Houston Baptist)",
    "Incarnate Word",
    "Lamar",
    "McNeese",
    "Nicholls",
    "Northwestern State",
    "Southeastern Louisiana",
    "Texas A&M-Corpus Christi",
  ],
  "Southwestern Athletic Conference (SWAC)": [
    "Alabama A&M",
    "Alabama State",
    "Alcorn State",
    "Bethune-Cookman",
    "Florida A&M",
    "Grambling State",
    "Jackson State",
    "Mississippi Valley State",
    "Prairie View A&M",
    "Southern",
    "Texas Southern",
    "UAPB (Arkansas-Pine Bluff)",
  ],
  "Summit League": [
    "Denver",
    "Kansas City",
    "North Dakota",
    "North Dakota State",
    "Omaha",
    "Oral Roberts",
    "South Dakota",
    "South Dakota State",
    "St. Thomas (MN)",
    "Western Illinois",
  ],
  "Sun Belt Conference": [
    "Appalachian State",
    "Arkansas State",
    "Coastal Carolina",
    "Georgia Southern",
    "Georgia State",
    "James Madison",
    "Louisiana",
    "Marshall",
    "Old Dominion",
    "South Alabama",
    "Southern Miss",
    "Texas State",
    "Troy",
    "ULM (Louisiana-Monroe)",
  ],
  "West Coast Conference (WCC)": [
    "BYU",
    "Gonzaga",
    "Loyola Marymount",
    "Pacific",
    "Pepperdine",
    "Portland",
    "Saint Mary's",
    "San Diego",
    "San Francisco",
    "Santa Clara",
  ],
  "Western Athletic Conference (WAC)": [
    "Abilene Christian",
    "California Baptist",
    "Grand Canyon",
    "Stephen F. Austin",
    "Southern Utah",
    "Tarleton State",
    "UT Arlington",
    "UTRGV (Texas-Rio Grande Valley)",
    "Utah Tech",
    "Utah Valley",
  ],
}

const HOCKEY_CONFERENCES = {
  "Atlantic Hockey Association (AHA)": [
    "Air Force",
    "American International",
    "Army",
    "Bentley",
    "Canisius",
    "Holy Cross",
    "Mercyhurst",
    "Niagara",
    "RIT (Rochester Institute of Technology)",
    "Sacred Heart",
  ],
  "Big Ten Conference": [
    "Michigan",
    "Michigan State",
    "Minnesota",
    "Notre Dame",
    "Ohio State",
    "Penn State",
    "Wisconsin",
  ],
  "Central Collegiate Hockey Association (CCHA)": [
    "Bemidji State",
    "Bowling Green",
    "Ferris State",
    "Lake Superior State",
    "Minnesota State (Mankato)",
    "Northern Michigan",
    "St. Thomas (MN)",
    "Michigan Tech",
  ],
  "ECAC Hockey": [
    "Brown",
    "Clarkson",
    "Colgate",
    "Cornell",
    "Dartmouth",
    "Harvard",
    "Princeton",
    "Quinnipiac",
    "RPI (Rensselaer Polytechnic Institute)",
    "St. Lawrence",
    "Union (NY)",
    "Yale",
  ],
  "Hockey East Association": [
    "Boston College",
    "Boston University",
    "Connecticut (UConn)",
    "Maine",
    "Massachusetts (UMass)",
    "UMass Lowell",
    "Merrimack",
    "New Hampshire",
    "Northeastern",
    "Providence",
    "Vermont",
  ],
  "National Collegiate Hockey Conference (NCHC)": [
    "Colorado College",
    "Denver",
    "Miami (OH)",
    "Minnesota Duluth",
    "Nebraska Omaha",
    "North Dakota",
    "St. Cloud State",
    "Western Michigan",
  ],
  "Independent Schools": [
    "Alaska Anchorage",
    "Alaska Fairbanks",
    "Arizona State",
    "LIU (Long Island University)",
    "Lindenwood",
  ],
}

const BASEBALL_CONFERENCES = {
  "America East Conference": ["Albany", "Binghamton", "Bryant", "Maine", "NJIT", "UMass Lowell", "UMBC", "Vermont"],
  "American Athletic Conference (AAC)": [
    "Charlotte",
    "East Carolina",
    "Houston",
    "Memphis",
    "South Florida",
    "Temple",
    "Tulane",
    "UAB",
    "UCF",
    "Wichita State",
  ],
  "Atlantic 10 Conference (A-10)": [
    "Davidson",
    "Dayton",
    "Fordham",
    "George Mason",
    "George Washington",
    "La Salle",
    "Rhode Island",
    "Richmond",
    "St. Bonaventure",
    "Saint Joseph's",
    "Saint Louis",
    "UMass",
    "VCU",
  ],
  "Atlantic Coast Conference (ACC)": [
    "Boston College",
    "Clemson",
    "Duke",
    "Florida State",
    "Georgia Tech",
    "Louisville",
    "Miami (FL)",
    "North Carolina",
    "NC State",
    "Notre Dame",
    "Pittsburgh",
    "Virginia",
    "Virginia Tech",
    "Wake Forest",
  ],
  "ASUN Conference": [
    "Austin Peay",
    "Bellarmine",
    "Central Arkansas",
    "Eastern Kentucky",
    "FGCU (Florida Gulf Coast)",
    "Jacksonville",
    "Jacksonville State",
    "Kennesaw State",
    "Lipscomb",
    "North Alabama",
    "North Florida",
    "Queens (NC)",
    "Stetson",
  ],
  "Big East Conference": ["Butler", "Creighton", "Georgetown", "Seton Hall", "St. John's", "Villanova", "Xavier"],
  "Big South Conference": [
    "Campbell",
    "Charleston Southern",
    "Gardner-Webb",
    "High Point",
    "Longwood",
    "Presbyterian",
    "Radford",
    "UNC Asheville",
    "USC Upstate",
    "Winthrop",
  ],
  "Big Ten Conference": [
    "Illinois",
    "Indiana",
    "Iowa",
    "Maryland",
    "Michigan",
    "Michigan State",
    "Minnesota",
    "Nebraska",
    "Northwestern",
    "Ohio State",
    "Penn State",
    "Purdue",
    "Rutgers",
  ],
  "Big 12 Conference": [
    "Baylor",
    "Kansas",
    "Kansas State",
    "Oklahoma",
    "Oklahoma State",
    "TCU",
    "Texas",
    "Texas Tech",
    "West Virginia",
  ],
  "Big West Conference": [
    "Cal Poly",
    "Cal State Bakersfield",
    "Cal State Fullerton",
    "Hawaii",
    "Long Beach State",
    "UC Davis",
    "UC Irvine",
    "UC Riverside",
    "UC San Diego",
    "UC Santa Barbara",
  ],
  "Colonial Athletic Association (CAA)": [
    "Charleston",
    "Delaware",
    "Elon",
    "Hofstra",
    "Monmouth",
    "Northeastern",
    "Stony Brook",
    "Towson",
    "UNC Wilmington",
    "William & Mary",
  ],
  "Conference USA (C-USA)": [
    "Charlotte",
    "FIU",
    "Florida Atlantic",
    "Louisiana Tech",
    "Marshall",
    "Middle Tennessee",
    "Old Dominion",
    "Rice",
    "Southern Miss",
    "UAB",
    "UTSA",
    "Western Kentucky",
  ],
  "Horizon League": [
    "Cleveland State",
    "Detroit Mercy",
    "Green Bay",
    "Milwaukee",
    "Northern Kentucky",
    "Oakland",
    "Purdue Fort Wayne",
    "Wright State",
    "Youngstown State",
  ],
  "Ivy League": ["Brown", "Columbia", "Cornell", "Dartmouth", "Harvard", "Penn", "Princeton", "Yale"],
  "Metro Atlantic Athletic Conference (MAAC)": [
    "Canisius",
    "Fairfield",
    "Iona",
    "Manhattan",
    "Marist",
    "Monmouth",
    "Niagara",
    "Quinnipiac",
    "Rider",
    "Saint Peter's",
    "Siena",
  ],
  "Mid-American Conference (MAC)": [
    "Akron",
    "Ball State",
    "Bowling Green",
    "Central Michigan",
    "Eastern Michigan",
    "Kent State",
    "Miami (OH)",
    "Northern Illinois",
    "Ohio",
    "Toledo",
    "Western Michigan",
  ],
  "Mid-Eastern Athletic Conference (MEAC)": [
    "Coppin State",
    "Delaware State",
    "Maryland Eastern Shore",
    "Norfolk State",
    "North Carolina A&T",
  ],
  "Missouri Valley Conference (MVC)": [
    "Bradley",
    "Dallas Baptist",
    "Evansville",
    "Illinois State",
    "Indiana State",
    "Missouri State",
    "Southern Illinois",
    "Valparaiso",
  ],
  "Mountain West Conference (MWC)": [
    "Air Force",
    "Boise State",
    "Colorado State",
    "Fresno State",
    "Nevada",
    "New Mexico",
    "San Diego State",
    "San Jose State",
    "UNLV",
    "Utah State",
  ],
  "Northeast Conference (NEC)": [
    "Bryant",
    "Central Connecticut",
    "Fairleigh Dickinson",
    "LIU",
    "Merrimack",
    "Mount St. Mary's",
    "Sacred Heart",
    "St. Francis (PA)",
    "Wagner",
  ],
  "Ohio Valley Conference (OVC)": [
    "Belmont",
    "Eastern Illinois",
    "Lindenwood",
    "Morehead State",
    "Southeast Missouri State",
    "Southern Indiana",
    "Tennessee State",
    "Tennessee Tech",
    "UT Martin",
  ],
  "Pac-12 Conference": [
    "Arizona",
    "Arizona State",
    "California",
    "Oregon",
    "Oregon State",
    "Stanford",
    "UCLA",
    "USC",
    "Utah",
    "Washington",
    "Washington State",
  ],
  "Patriot League": ["Army", "Boston University", "Bucknell", "Holy Cross", "Lafayette", "Lehigh", "Navy"],
  "Southeastern Conference (SEC)": [
    "Alabama",
    "Arkansas",
    "Auburn",
    "Florida",
    "Georgia",
    "Kentucky",
    "LSU",
    "Mississippi State",
    "Missouri",
    "Ole Miss",
    "South Carolina",
    "Tennessee",
    "Texas A&M",
    "Vanderbilt",
  ],
  "Southern Conference (SoCon)": [
    "The Citadel",
    "ETSU (East Tennessee State)",
    "Furman",
    "Mercer",
    "Samford",
    "UNC Greensboro",
    "VMI",
    "Western Carolina",
    "Wofford",
  ],
  "Southland Conference": [
    "Houston Christian",
    "Incarnate Word",
    "Lamar",
    "McNeese State",
    "Nicholls State",
    "Northwestern State",
    "Southeastern Louisiana",
    "Texas A&M-Corpus Christi",
  ],
  "Southwestern Athletic Conference (SWAC)": [
    "Alabama A&M",
    "Alabama State",
    "Alcorn State",
    "Arkansas-Pine Bluff",
    "Bethune-Cookman",
    "Florida A&M",
    "Grambling State",
    "Jackson State",
    "Mississippi Valley State",
    "Prairie View A&M",
    "Southern",
    "Texas Southern",
  ],
  "Summit League": [
    "Denver",
    "North Dakota State",
    "Omaha",
    "Oral Roberts",
    "South Dakota State",
    "St. Thomas (MN)",
    "Western Illinois",
  ],
  "Sun Belt Conference": [
    "Appalachian State",
    "Arkansas State",
    "Coastal Carolina",
    "Georgia Southern",
    "Georgia State",
    "James Madison",
    "Louisiana",
    "Louisiana-Monroe (ULM)",
    "South Alabama",
    "Southern Miss",
    "Texas State",
    "Troy",
  ],
  "West Coast Conference (WCC)": [
    "BYU",
    "Gonzaga",
    "Loyola Marymount",
    "Pacific",
    "Pepperdine",
    "Portland",
    "Saint Mary's",
    "San Diego",
    "San Francisco",
    "Santa Clara",
  ],
  "Western Athletic Conference (WAC)": [
    "Abilene Christian",
    "California Baptist",
    "Grand Canyon",
    "Sam Houston",
    "Seattle U",
    "Stephen F. Austin",
    "Tarleton State",
    "UTRGV",
    "Utah Valley",
  ],
}

export default function SubdivisionDropdown({ onSubdivisionSelect, sport }: SubdivisionDropdownProps) {
  const [selectedSubdivision, setSelectedSubdivision] = useState<string>(sport === "football" ? "FBS" : "")
  const [selectedConference, setSelectedConference] = useState<string>("")
  const [selectedTeam, setSelectedTeam] = useState<string>("")

  const handleSubdivisionChange = (subdivision: string) => {
    if (sport === "football") {
      setSelectedSubdivision(subdivision)
      setSelectedConference("")
      setSelectedTeam("")
      onSubdivisionSelect(subdivision, "", "")
    }
  }

  const handleConferenceChange = (conference: string) => {
    setSelectedConference(conference)
    setSelectedTeam("")
    onSubdivisionSelect(sport === "football" ? selectedSubdivision : "", conference, "")
  }

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team)
    onSubdivisionSelect(selectedSubdivision, selectedConference, team)
  }

  const conferences =
    sport === "football"
      ? selectedSubdivision === "FBS"
        ? FBS_CONFERENCES
        : FCS_CONFERENCES
      : sport === "basketball"
        ? BASKETBALL_CONFERENCES
        : sport === "hockey"
          ? HOCKEY_CONFERENCES
          : BASEBALL_CONFERENCES

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {selectedTeam ||
            selectedConference ||
            (sport === "football" ? selectedSubdivision : "Select Conference") ||
            "Select"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
        {sport === "football" && (
          <DropdownMenuRadioGroup value={selectedSubdivision} onValueChange={handleSubdivisionChange}>
            <DropdownMenuRadioItem value="FBS">FBS</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="FCS">FCS</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        )}
        {Object.entries(conferences).map(([conference, teams]) => (
          <DropdownMenuSub key={conference}>
            <DropdownMenuSubTrigger>{conference}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="max-h-[200px] overflow-y-auto">
              <DropdownMenuRadioGroup value={selectedTeam} onValueChange={handleTeamChange}>
                {teams.map((team) => (
                  <DropdownMenuRadioItem key={team} value={team}>
                    {team}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
