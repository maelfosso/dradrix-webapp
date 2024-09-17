import { Description } from "@/components/common/Fieldset";
import { Strong } from "@/components/common/Text";
import { cn } from "lib/utils";

interface EditKeyboardUsageProps {
  onHover: boolean,
  onFocus: boolean,

  onDelete?: () => void;
}
export const EditKeyboardUsage = ({
  onHover,
  onFocus
}: EditKeyboardUsageProps) => {
  return (
    <div className={cn(
      "flex m-0 p-0 absolute right-0 top-0 bottom-0 items-center justify-center",
      onHover || onFocus ? 'flex' : 'hidden'
    )}>
      <Description
        className={cn(
          "w-max sm:text-xs",
          onHover && !onFocus
            ? 'block'
            : 'hidden'
        )}
      >Click to edit</Description>
      <Description
        className={cn(
          "w-max flex-col items-start justify-center sm:text-xs",
          !onHover && onFocus
            ? 'flex'
            : 'hidden'
        )}
      >
        <span><Strong>Shift+Enter</Strong> to save.</span>
        <span><Strong>Esc</Strong> to cancel.</span>
      </Description>
    </div>
  )
}
