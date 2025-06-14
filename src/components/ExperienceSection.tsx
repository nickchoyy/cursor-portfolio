  <div className="flex flex-wrap gap-1.5">
    {item.skills.map((skill: string, skillIndex: number) => (
      <span 
        key={skillIndex}
        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground/80 uppercase tracking-wide transition-colors duration-300"
      >
        {themeChangeCount === 0 ? skill : <ScrambleText text={skill} trigger={themeChangeCount} />}
      </span>
    ))}
  </div> 