function Frame8() {
  return (
    <div className="absolute left-[18px] top-[94px] flex w-[237px] flex-col content-stretch items-start justify-start leading-[0] text-black">
      <div className="relative w-full shrink-0 font-['Lexend:Bold',_sans-serif] text-[18px] font-bold">
        <p className="leading-[normal]">ACS GBM</p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium">
        <p className="leading-[normal]">5:00 PM - 7:00 PM @ Bamboo Room RIT</p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium">
        <p className="leading-[normal]">June 5th, 2025</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute left-[350px] top-[107px] h-[265px] w-[351px] overflow-clip rounded-[15px] bg-white">
      <Frame8 />
      <div className="absolute left-[298px] top-[94px] size-9 rounded-[15px] bg-[#d9d9d9]" />
      <div className="absolute left-[18px] top-[156px] w-[316px] font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-black">
        <p className="leading-[normal]">{`Our general board meeting is held every week and serves as a welcoming space for all ACS members to connect, relax, and have fun together. It’s a time when we gather not just to discuss any relevant updates, but to enjoy a variety of games, share tasty snacks, and spend time socializing. `}</p>
      </div>
    </div>
  );
}

export default function Idea1() {
  return (
    <div className="relative size-full bg-[#f5d1d1]" data-name="Idea 1">
      <div className="absolute left-[100px] top-[61px] text-nowrap font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] text-[24px] not-italic leading-[0] text-black">
        <p className="whitespace-pre leading-[normal]">Come to our events!</p>
      </div>
      <Frame7 />
      <div
        className="bg-size-[106.56%_105.28%] absolute left-[100px] top-[107px] h-[265px] w-[226px] rounded-[15px] bg-[33.14%_35.71%] bg-no-repeat"
        data-name="Screenshot 2025-08-15 at 2.26.29 PM 1"
        style={{ backgroundImage: `url('/assets/screenshots/idea-screenshot.png')` }}
      />
    </div>
  );
}
