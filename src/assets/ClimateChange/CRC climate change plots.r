# Hamish C 2020.05.21
# Compare CRC standard results with climate change results
# 1 set of present results, 12 sets of future (12 models = 4 global X 3 regional)

library(ggplot2)
library(car)
library(RColorBrewer)

#source("S:/Biosci Bushfires/PROJECT_DATA/Hamish/scripts/other/multiplot.R")
source("C:/Users/hamishc/backup/documents/scripts/scripts/other/multiplot.R")

# deal with inability of ggplot to take arbitrary limits
# source: https://github.com/tidyverse/ggplot2/issues/2907 
scale_range <- function(scale, limits = NULL, expand = TRUE) {
  expansion <- if (expand) ggplot2:::expand_default(scale) else c(0, 0)
  
  if (is.null(limits)) {
    scale$dimension(expansion)
  } else {
    limits <- ifelse(is.na(limits), scale$get_limits(), limits)
    range <- range(scale$transform(limits))
    scales::expand_range(range, expansion[1], expansion[2])
  } 
}

assignInNamespace("scale_range", scale_range, ns = "ggplot2")

diri <- "C:/Users/hamishc/backup/working/"

pdata <- read.csv(paste0(diri,"CRC_w_CC_ActualBurnt.csv"))
reg <- unique(pdata$region)

pdata$Edge_Recode <- Recode(pdata$Edge_Treatment , "'E10'='T10'; 'E00'='T00';
                       'E15'='T15'; 'E01'='T01';'E02'='T02';'E03'='T03';'E05'='T05'", 
                       levels=c("T00","T01", "T02","T03","T05","T10", "T15"))

pdata$Landscape_Recode <- Recode(pdata$Landscape_Treatment, "'L10'='T10'; 'L00'='T00';
                           'L15'='T15'; 'L01'='T01';'L02'='T02';'L03'='T03';'L05'='T05'", 
                           levels=c("T00","T01", "T02","T03","T05","T10", "T15"))
pdata$lab <- as.factor(paste0(pdata$Landscape_Treatment, pdata$Edge_Treatment))
pdata$Landscape_Treatment<-factor(pdata$Landscape_Treatment, levels=c("L00","L01", "L02","L03","L05","L10", "L15"), order=T)
pdata$Edge_Treatment<-factor(pdata$Edge_Treatment, levels=c("E00","E01", "E02","E03","E05","E10", "E15"), order=T)


## equal treatment index
#EqIdx <- data$Edge_Treatment==data$Landscape_Treatment
#data_eq <- data[EqIdx,]
#data_eq$Treatment<- Recode(data_eq$Landscape_Treatment, "'T10'='10'; 'T00'='0';
#                           'T15'='15'; 'T01'='1';'T02'='2';'T03'='3';'T05'='5'", 
#                        levels=c("0","1", "2","3","5","10", "15"))

# variable names
d_names <- colnames(pdata)
abs_idx <- c(5:10)
rel_idx <- c(17:22)
var_abs <- d_names[abs_idx]
var_rel <- d_names[rel_idx]
var_units_abs <- c("Area burnt (ha)","Houses lost", "Lives lost", "Road damaged (m)", 
               "Powerline damaged (m)","Area burnt below TFI (ha)")
var_units_rel <- rep("Relative risk (1 = no treatment)",6)
var_names <- c("Area burnt","Houses lost", "Lives lost", "Road length damaged", 
               "Powerline length damaged","Area burnt below minimum TFI")

#bar.col =c("#5ab4ac")
bar.col <- c("#d8b365", "#5ab4ac", "#e9a3c9", "#a1d76a", "#af8dc3", "#f1a340", "#67a9cf")

#ymax_abs <- c(2750,5.5,2.2,27500, 1650,160)
#ymax_rel <- c(1,1,1,1,1,7)
#leglab <- c("Houses","Lives")
#lctr=2

#pdf("C:/Users/hamishc/backup/working/cc_breakdown.pdf", onefile = T)
pdf("C:/Users/hamishc/backup/working/cc_breakdown_rel.pdf", onefile = T)

for (rctr in 1:length(reg)){
  temp <- subset(pdata,region == reg[rctr])
  temp_pres <- subset(temp, Scenario=="Present")
  temp_fut <- subset(temp, Scenario=="Future")
  # PRES just keep variables, amount of edge and landscape treatment and label
  # FUT just keep variables and label - bounds of these  will be added back on to pres melt, for showing cc results
  #  temp_pres <- temp_pres[,c(2,3,abs_idx,25)]  # ABSOLUTE
  #  temp_fut <- temp_fut[,c(abs_idx,25)]   # ABSOLUTE
  temp_pres <- temp_pres[,c(2,3,rel_idx,25)] # RELATIVE
  temp_fut <- temp_fut[,c(rel_idx,25)]  # RELATIVE
  
  pres.melt <- melt(temp_pres,c("lab","Landscape_Treatment","Edge_Treatment"))
  fut.melt <- melt(temp_fut, c("lab"))

  for (vctr in 1:length(var_abs)) {
    
  #pres.melt.plot <- subset(pres.melt, variable==var_abs[vctr])  # ABSOLUTE 
  #fut.melt.plot <- subset(fut.melt, variable==var_abs[vctr])    # ABSOLUTE
  pres.melt.plot <- subset(pres.melt, variable==var_rel[vctr])   # RELATIVE
  fut.melt.plot <- subset(fut.melt, variable==var_rel[vctr])     # RELATIVE

  ulabs <- unique(fut.melt.plot$lab) # unique labels
  for (lctr in 1:length(ulabs)) { # messy way of getting projected min and max
    pres.melt.plot$fut_min[pres.melt.plot$lab==ulabs[lctr]] <- min(fut.melt.plot$value[fut.melt.plot$lab==ulabs[lctr]])
    pres.melt.plot$fut_max[pres.melt.plot$lab==ulabs[lctr]] <- max(fut.melt.plot$value[fut.melt.plot$lab==ulabs[lctr]])
  }
#  nopbval <- array(pres.melt.plot$value[pres.melt.plot$lab=="L00E00"], c(196,1))
#  minval <- array(min(pres.melt.plot$value),c(196,1)) 
  
  
  p <- ggplot(pres.melt.plot,aes(x = lab, y = value, fill=Landscape_Treatment))
  p <- p + geom_bar(stat = "identity") 
  #  p <- p + scale_colour_brewer(palette="Set1")
  p <- p + scale_fill_manual(values=bar.col, labels=c("00","01","02","03","05","10","15"))
  p <- p + theme(axis.text.x = element_text(angle = 90, hjust = 1),
                 panel.grid.major = element_blank(), 
                 panel.grid.minor = element_blank(),
                 panel.background = element_blank(), 
                 axis.line = element_line(colour = "black"),
                 axis.title.y = element_text(size=12),
                 plot.title = element_text(size=16),
#                 plot.caption = element_text(size=14)
                 plot.subtitle = element_text(size=14)
                  )
  p <- p + labs(title = paste0(reg[rctr],": ", var_names[vctr]),x = "Edge Treatment (%)",
#                y = var_units_abs[vctr], 
                y = var_units_rel[vctr], 
                fill="Landscape\nTreatment (%)", 
                subtitle="Black line shows range under projected climate change") 
#  p <- p + geom_abline(slope=0, intercept=nopbval) # no prescribed burning
#  p <- p + geom_abline(slope=0, intercept=minval)  # minimum
#  p <- p + coord_cartesian(ylim=c(0,NA))
  p <- p + scale_x_discrete(labels=rep(c("00","01","02","03","05","10","15"),7))
  p <- p + scale_y_continuous(expand=expand_scale(mult=c(0,0.1)))
  
  p <- p + geom_segment(aes(x=as.numeric(lab), xend=as.numeric(lab), # line showing range of cc projections
                            y=fut_min, yend=fut_max), size=0.5)
  p <- p + geom_point(aes(x=as.numeric(lab), y=fut_min), size=0.5) # marker for lower end of line
  p <- p + geom_point(aes(x=as.numeric(lab), y=fut_max), size=0.5) # marker for upper end of line
  p <- p + guides(fill = guide_legend(override.aes = list(shape = NA))) # remove point from legend
  
  print(p)
  rm(list=c("p","ulabs","pres.melt.plot","fut.melt.plot"))
  }
  rm(list=c("fut.melt","pres.melt","temp_pres","temp_fut","temp"))
}

dev.off()

# Now summarise the whole lot on one plot
plot.cols <- c("#f1a340","#998ec3")
#temp <- pdata[,c(1,abs_idx,13)] # ABSOLUTE
temp <- pdata[,c(1,rel_idx,13)] # RELATIVE
temp$Scenario<-factor(temp$Scenario, levels=c("Present","Future"), order=T)

t.melt <- melt(temp,c("region","Scenario"))

#pdf("C:/Users/hamishc/backup/working/cc_grouped.pdf", onefile = T)
pdf("C:/Users/hamishc/backup/working/cc_grouped_rel.pdf", onefile = T)

for (vctr in 1:length(var_abs)){
  # just keep variables, scenario and region
  
#    melt.gg <- subset(t.melt, variable==var_abs[vctr]) # ABSOLUTE
    melt.gg <- subset(t.melt, variable==var_rel[vctr]) # RELATIVE
    
    p <- ggplot(melt.gg, aes(region, value))
    p <- p + geom_jitter(aes(colour=Scenario), position=position_jitterdodge())
    p <- p + scale_color_manual(values=plot.cols)
    p <- p + theme_classic()
    p <- p + theme(axis.text.x = element_text(angle = 90),
                   plot.title = element_text(size=16),
                   plot.subtitle = element_text(size=14),
                   axis.title.y = element_text(size=12),
                   axis.title.x = element_text(size=12)
                   ) 
    p <- p + labs(title = paste0("Climate change effects on: ", var_names[vctr]),
                  subtitle = "Across all treatments",
                  x = "Region",
#                  y = var_units_abs[vctr]   # ABSOLUTE
                  y = var_units_rel[vctr] # RELATIVE
                  )
    p <- p + guides(color = guide_legend(override.aes = list(size = 5)))
    print(p)
    rm(list=c("p","melt.gg"))
}
dev.off()
