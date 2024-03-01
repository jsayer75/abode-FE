import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Event } from "./eventCard.interface";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUser } from "../../contexts/UserContext";

interface Props {
  event: Event;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

function EventCard({ event, onDelete, onUpdate }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUser();

  const attendeeNames = event.attendees.map((attendee) => attendee.email);

  const formattedDate = (isoString: string) => {
    const date = new Date(isoString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    onDelete(event._id);
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    onUpdate(event._id);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      {user?.id === event.createdBy.id && (
        <CardActions
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            aria-label="delete"
            aria-controls="delete-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
            <MenuItem onClick={handleUpdate}>Update</MenuItem>
          </Menu>
        </CardActions>
      )}

      <CardContent sx={{ paddingTop: 0 }}>
        <Typography variant="h5" component="h2">
          {event.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {event.description || "No Description"}
        </Typography>
        <Typography variant="body2" component="p">
          Start Time: {formattedDate(event.startAt)}
        </Typography>
        <Typography variant="body2" component="p">
          End Time: {formattedDate(event.endAt)}
        </Typography>
        <Typography variant="body2" component="p">
          Organizer: {event.createdBy.email}
        </Typography>
        <Typography variant="body2" component="p">
          Attendees: {attendeeNames.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EventCard;
