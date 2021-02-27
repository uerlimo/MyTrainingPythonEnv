raw_time = 120
minutes, seconds = divmod(raw_time, 60)
hours, minutes = divmod(minutes, 60)

print(f"{raw_time}s is {hours}h {minutes}m {seconds}s")
